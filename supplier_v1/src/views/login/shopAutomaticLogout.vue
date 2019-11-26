<template></template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    localStorage.clear();
    location.href = `${url.shopUrl}`;
  }
};
</script>

<style lang="scss" scope>
</style>
