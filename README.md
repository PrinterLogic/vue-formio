# vue-formio

A [Vue.js](http://vue.js/) component for rendering out forms based on the [Form.io](https://www.form.io) platform.

## Install

### npm

`Vue Formio` can be used on the server, or bundled for the client using an npm-compatible packaging system such as
[Vite](https://vitejs.dev/).

```shell
npm install @formio/vue@github:PrinterLogic/vue-formio --save
```

## Basic Usage

HTML inside of Vue template file:

```vue
<template>
  <div id="app">
    <Formio src="" url="" form="" submission="" options="" v-on:submit=""></Formio>
  </div>
</template>
```

Javascript inside of Vue template file.

```vue
<script setup>
import { Formio } from '@formio/vue'
</script>
```

## Props

### `src` : `string`

The form API source from [form.io](https://www.form.io) or your custom formio server.

See the [Creating a form](http://help.form.io/userguide/#new-form) for where to set the API Path for your form.

You can also pass in the submission url as the `src` and the form will render with the data populated from the
submission.

### `url` : `string`

If you pass in the form and submission directly, some components such as resources, files and forms need to know the url
of the form on the server. Pass it in with the url option.

### `form` : `object`

An object representing the form. Use this instead of src for custom forms.

**Note:** `src` will override this property if used.

### `submission`: `Object`

An object representing the default data for the form.

**Note:** `src` will override this if a submission url is entered.

### `options`: `object`

An object with the formio.js options that is passed through. See
[Form.io Options](https://github.com/formio/formio.js/wiki/Form-Renderer#options).

## Events

All events triggered from the form are available via the v-on property. See
[Form.io Events](https://github.com/formio/formio.js/wiki/Form-Renderer#events) for all the available events.

Then on the form set `<formio src="myform" v-on:submit="doSomething" />`

## FormBuilder

HTML inside of Vue template file:

```vue
<template>
  <div id="app">
    <FormBuilder
      v-bind:form="{ display: 'form' }"
      v-bind:options="{}"
      v-on:change="(schema) => console.log(schema)"
    ></FormBuilder>
  </div>
</template>
```

Javascript inside of Vue template file.

```vue
<script setup>
import { FormBuilder } from '@formio/vue'
</script>
```

## Form Actions

Get access to the form instance

```vue
<template>
  <div id="app">
    <Formio ref="formioForm"></Formio>
  </div>
</template>
```

Run a method

```js
this.$refs.formioForm.formio.submit()
```

All methods are available [here](https://help.form.io/developers/form-renderer#form-methods).

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT).
