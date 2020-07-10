<template>
  <div>
    <form>
      <input type="text" v-inputmask="99999-999" autofocus>
      <button>Buscar endereço</button>
    </form>
  </div>
</template>

<script>
export default {
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
