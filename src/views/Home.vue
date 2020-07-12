<template>
  <div>
    <form>
      <input
        type="text"
        inputmode="numeric"
        v-model="cep"
        v-inputmask
        autofocus
      >

      <button>Buscar endereço</button>
    </form>

    <p>
      {{ cepRaw }}
    </p>

    <p>
      {{ isCepValid }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cep: '01001-000'
    }
  },
  computed: {
    isCepValid() {
      const regex = /^\d{5}-\d{3}$/

      return regex.test(this.cep)
    },
    cepRaw() {
      return this.cep.trim().replace(/\D+/g, '')
    }
  },
  directives: {
    inputmask: {
      bind(el, binding, vnode) {
        new Inputmask('99999-999', {
          clearMaskOnLostFocus: false
        }).mask(el)
      }
    }
  }
}
</script>
