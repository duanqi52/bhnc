<template>
  <div id="app" class="page">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .page{
    height: 100%;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"]{
    -moz-appearance:textfield;
  }
</style>
