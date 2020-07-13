<template>
  <label>
    <input
      type="text"
      class="block w-full"
      :value="value"
      readonly
      @focus="focusHandler"
    >

    <span>Copiar</span>
  </label>
</template>

<script>
export default {
  props: [
    'value'
  ],
  methods: {
    focusHandler(event) {
      const elInput = event.currentTarget

      elInput.select()
      elInput.setSelectionRange(0, 99999)

      document.execCommand('copy')
    }
  }
}
</script>
