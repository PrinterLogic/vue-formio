/**
 * Augment the typings of Vue.js
 */

import Vue from "vue";
import vasion-formiojs from 'vasion-formiojs';

declare module "vue/types/vue" {
  interface Vue {
    $formio: vasion-formiojs;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    formio?: vasion-formiojs;
  }
}