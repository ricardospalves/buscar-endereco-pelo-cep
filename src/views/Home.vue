<template>
  <div>
    <form @submit.prevent="fetchCepFromServices">
      <input
        type="text"
        inputmode="numeric"
        v-model="cep"
        v-inputmask
        autofocus
      >

      <button>Buscar endereço</button>
    </form>

    <p v-if="isFetching">
      Buscando o endereço para o CEP <strong>{{ cep }}</strong>…
    </p>

    <template v-else>
      <template v-if="hasError">
        <p v-if="!didCepChangeAfterFetch">
          Desculpe, não foi encontrado nenhum endereço para o CEP <strong>{{ cep }}</strong>.
        </p>
      </template>

      <template v-else>
        <p v-if="address">
          {{ address | formattedAddress }}
        </p>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cep: '01001-000',
      fetchCep: '',
      isFetching: false,
      hasError: false,
      address: ''
    }
  },
  computed: {
    isCepValid() {
      const regex = /^\d{5}-\d{3}$/

      return regex.test(this.cep)
    },
    cepRaw() {
      return this.cep.trim().replace(/\D+/g, '')
    },
    didCepChangeAfterFetch() {
      return this.cep !== this.fetchCep
    }
  },
  methods: {
    fetchCepFromServices() {
      if(this.isCepValid) {
        if(this.didCepChangeAfterFetch) {
          this.isFetching = true

          fetch(`https://viacep.com.br/ws/${this.cepRaw}/json/`)
            .then(response => response.json())
            .then(json => {
              if(json.erro) {
                this.hasError = true
              }

              else {
                this.hasError = false
                this.address = json
              }
            })
            .catch(error => {
              console.error(error)
            })
            .finally(() => {
              this.isFetching = false
              this.fetchCep = this.cep
            })
        }
      }
    }
  },
  filters: {
    formattedAddress(address) {
      const { cep, logradouro, bairro, localidade, uf } = address

      return `${logradouro} - ${bairro}, ${localidade} - ${uf}, ${cep}`
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
