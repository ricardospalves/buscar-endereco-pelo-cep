<template>
  <label>
    <textarea
      class="block w-full leading-normal h-6 text-base border border-gray-500"
      v-model="value"
      readonly
      @focus="focusHandler"
    ></textarea>

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
  },
  mounted() {
    this.$autosize(this.$el.querySelector('textarea'))
  }
}
</script>
