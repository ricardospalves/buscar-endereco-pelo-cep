<template>
  <div>
    <h1 class="text-2xl sm:text-3xl text-center font-bold">
      Buscar endereço pelo CEP
    </h1>

    <form
      class="max-w-md mx-auto"
      @submit.prevent="fetchCepFromServices"
    >
      <label
        for="cep"
        class="block pb-2"
      >
        Digite o CEP para buscar pelo endereço
      </label>

      <div class="grid grid-cols-12">
        <input
          type="text"
          id="cep"
          class="col-span-6 block py-2 border-2 border-transparent hover:border-black focus:border-black text-black text-xl text-center focus:outline-none focus:shadow-outline bg-gray-300 hover:bg-transparent focus:bg-transparent rounded-l transition-colors duration-200"
          inputmode="numeric"
          placeholder="exemplo: 12345-678"
          v-model="cep"
          v-inputmask
          autofocus
        >

        <button
          class="col-span-6 block py-2 font-bold text-white bg-black hover:bg-gray-800 focus:bg-gray-800 focus:outline-none focus:shadow-outline transition-colors duration-200 rounded-r"
        >
          Buscar endereço
        </button>
      </div>
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
        <Address v-if="address" :value="address | formattedAddress"/>
      </template>
    </template>

    <div v-if="adresses.length">
      <h2>
        Endereços recentes
      </h2>

      <ul>
        <li v-for="address in adresses" :key="address.cep">
          <Address :value="address | formattedAddress"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Address from '../components/Address'

export default {
  components: {
    Address
  },
  data() {
    return {
      cep: '01001-000',
      fetchCep: '',
      isFetching: false,
      hasError: false,
      address: '',
      adresses: []
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
  watch: {
    adresses(array) {
      localStorage.setItem('adresses', JSON.stringify(array))
    }
  },
  methods: {
    fetchCepFromServices() {
      if(this.isCepValid) {

        if(this.didCepChangeAfterFetch) {
          const address = this.adresses.find(address => address.cep === this.cep)

          this.fetchCep = this.cep

          if(address) {
            this.address = address
          }

          else {
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
                  this.adresses.push(json)
                }
              })
              .catch(error => {
                console.error(error)
              })
              .finally(() => {
                this.isFetching = false
              })
          }
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
  },
  mounted() {
    if (localStorage.adresses) {
      this.adresses = JSON.parse(localStorage.getItem('adresses'))
    }
  }
}
</script>
