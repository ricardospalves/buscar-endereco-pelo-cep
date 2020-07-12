<template>
  <div>
    <form @submit.prevent="fetchCep">
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
  methods: {
    fetchCep() {
      if(this.isCepValid) {
        fetch(`https://viacep.com.br/ws/${this.cepRaw}/json/`)
          .then(response => response.json())
          .then(json => {
            console.log(json)
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {
            console.log('Finally!')
          })
      }
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
