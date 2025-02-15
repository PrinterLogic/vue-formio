/* globals console, Promise */
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator'
import FormBuilder from 'vasion-formiojs/FormBuilder';
import AllComponents from 'vasion-formiojs/components';
import Components from 'vasion-formiojs/components/Components';
Components.setComponents(AllComponents);
import Formio from 'vasion-formiojs/Formio';
/*
 * This is a duplicate of Formio Renderer for now. Once the formio.js builder is complete this will be update to mimic it.
 */

@Component
export default class extends Vue {
  builder?: any
  builderReady?: Promise<any>

  @Prop()
  form?: any

  @Prop({ default: {} })
  options?: object

  @Watch('form')
  formChange(value: object) {
    if (this.builder) {
      this.builder.instance.form = value;
    }
  }

  mounted() {
    this.initializeBuilder()
      .catch((err) => {
        /* eslint-disable no-console */
        console.warn(err);
        /* eslint-enable no-console */
      });
  }

  destroyed() {
    if (this.builder) {
      this.builder.instance.destroy(true);
    }
  }

  initializeBuilder(): Promise<any> {
    if (this.form) {
      this.builder = new FormBuilder(this.$refs.formio, this.form, this.options);
      this.builderReady = this.builder.setDisplay(this.form.display);
      return this.builderReady.then(() => {
        this.builder.instance.events.onAny((...args: any[]) => {
          const eventParts = args[0].split('.');

          // Only handle formio events.
          if (eventParts[0] !== 'formio' || eventParts.length !== 2) {
            return;
          }

          // Remove formio. from event.
          args[0] = eventParts[1];

          this.$emit.apply(this, args);

          // Emit a change event if the schema changes.
          if (['saveComponent', 'updateComponent', 'deleteComponent'].includes(eventParts[1])) {
            args[0] = 'change';
            this.$emit.apply(this, args);
          }
        });
      });

    }
    else {
      // If we get to here there is no src or form
      return Promise.reject('Must set form attribute');
    }
  }

  render(createElement: any) {
    return createElement('div', { ref: 'formio' });
  }
};
