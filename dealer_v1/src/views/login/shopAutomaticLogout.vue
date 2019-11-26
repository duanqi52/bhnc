<template></template>

<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {};
  },
  created() {
    localStorage.clear();
    location.href = `${url.shopUrl}/index?shopAutomaticLogout=`;
  }
};
</script>

<style lang="scss" scope>
</style>
