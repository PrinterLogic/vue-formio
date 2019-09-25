import Form from './components/Form';
import { Provider } from './Provider';
import formiojs from 'formiojs';
import Vue from 'vue';

// Provide a plugin by default that will register all components.
export class Plugin {
  // Vue Plugin
  static install (Vue: Vue, { providers, store, router }: { providers: Provider[], store: any, router: any }) {
    // Vue.$formio = formiojs;

    // Vue.component('Form', Form);

    providers.forEach(provider => {
      provider.init(Vue);
      provider.registerRoutes(router);
      provider.registerStore(store);
    });
  }
};
