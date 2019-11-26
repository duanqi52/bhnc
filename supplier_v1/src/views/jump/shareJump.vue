<template>
<div>
</div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {
    var username = this.$route.query.id;
    var is_mobi = navigator.userAgent
        .toLowerCase()
        .match(
          /(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
        ) != null;
    if (is_mobi) {
      this.$router.push('/createMarke_a?id='+username)
    } else {
      this.$router.push('/createMarke?id='+username)
    }
  }
};
</script>