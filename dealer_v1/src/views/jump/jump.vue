<template></template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    var username = this.$route.query.a;
    var password = this.$route.query.password;
    var roles = this.$route.query.roles;
    var Authorization = this.$route.query.Authorization;
    var ID = this.$route.query.id;
    var expireTime = this.$route.query.expireTime;
    localStorage.siteName = username;
    localStorage.Authorization = Authorization;
    localStorage.roles = roles;
    localStorage.ID = ID;
    localStorage.expireTime = expireTime;
    if (this.$route.query.order) {
      location.href = "/order";
      return;
    }
    if (this.$route.query.recharge) {
      location.href = "/recharge";
      return;
    }
    this.$router.push("/index");
  }
};
</script>