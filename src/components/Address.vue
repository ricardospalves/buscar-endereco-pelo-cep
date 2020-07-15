<template>
  <label class="block">
    <textarea
      class="block w-full leading-normal h-12 p-2 border-2 border-transparent hover:border-black focus:border-black text-xl text-center focus:outline-none focus:shadow-outline bg-gray-300 hover:bg-transparent focus:bg-transparent rounded-t transition-colors duration-200"
      v-model="value"
      readonly
      @focus="focusHandler"
      @blur="blurHandler"
    ></textarea>

    <span
      class="block py-2 font-bold text-center text-white bg-black hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:shadow-outline rounded-b transition-colors duration-200"
    >
      {{ isOnClipboard ? 'Copiado' : 'Copiar' }}
    </span>
  </label>
</template>

<script>
export default {
  props: [
    'value'
  ],
  data() {
    return {
      isOnClipboard: false
    }
  },
  methods: {
    focusHandler(event) {
      const elInput = event.currentTarget

      elInput.select()
      elInput.setSelectionRange(0, 99999)

      document.execCommand('copy')

      this.isOnClipboard = true
    },
    blurHandler() {
      this.isOnClipboard = false
    }
  },
  mounted() {
    this.$autosize(this.$el.querySelector('textarea'))
  }
}
</script>
