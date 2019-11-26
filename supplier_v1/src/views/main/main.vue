<!-- 组件说明 -->
<template>
  <div class>
    <el-row style="height:100%">
      <Header></Header>

      <div
        id="navBox"
        class="nav-box"
        style="width: 17.63%;height: 100%;top: 64px;position: fixed;left: 0;border-right: 1px solid #e6e6e6;float: right;transition: all 0.5s;
    border-top: 12px solid #f0f0f0;"
      >
        <navMneu></navMneu>
      </div>

      <div
        id="content"
        class="content"
        style="width: 82.39%;border: 12px solid #F0F0F0;float: right;transition: all 0.5s ease 0s;margin-top:64px;"
      >
        <router-view></router-view>
      </div>
    </el-row>
  </div>
</template>


<script>
//import x from ''
import navMneu from "@/components/common/navMenu";
import Header from "@/components/common/Header";
import url from "@/serverAPI.config.js";

export default {
  components: {
    navMneu,
    Header
  },
  data() {
    return {};
  },
  mounted() {
    if (document.getElementById("twoNav")) {
      document.getElementById("navBox").style.width = "17.63%";
      document.getElementById("content").style.width = "82.39%";
    } else {
      document.getElementById("navBox").style.width = "9.44%";
      document.getElementById("content").style.width = "90.56%";
      document.getElementById("firstBox").style.width = "100%";
    }
    this.getUserLoginInfo();
    var bodyHeight=window.screen.height;
    document.getElementById('content').style.minHeight=bodyHeight+'px';
    

  },
  created() {
    this.getUserLoginInfo();
  },
  updated() {
    if (document.getElementById("twoNav")) {
      document.getElementById("navBox").style.width = "17.63%";
      document.getElementById("content").style.width = "82.39%";
      document.getElementById("firstBox").style.width = "53.5%";
      document.getElementById("twoNav").style.width = "46.5%";
    } else {
      document.getElementById("navBox").style.width = "9.44%";
      document.getElementById("content").style.width = "90.56%";
      document.getElementById("firstBox").style.width = "100%";
    }
    this.getUserLoginInfo();
  },
  computed: {},
  methods: {
    getUserLoginInfo() {
      this.$http({
        url: `${url.getUserLoginInfo}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          if (res.data.data.urls) {
            localStorage.urls = res.data.data.urls;
          } else {
            localStorage.removeItem("urls");
          }

          if (res.data.data.sonName) {
            localStorage.sonName = res.data.data.sonName;
          } else {
            localStorage.removeItem("sonName");
          }

          if (res.data.data.sonUsername) {
            localStorage.sonUsername = res.data.data.sonUsername;
          } else {
            localStorage.removeItem("sonUsername");
          }

          if (res.data.data.job) {
            localStorage.job = res.data.data.job;
          } else {
            localStorage.removeItem("job");
          }

          if (res.data.data.sonId) {
            localStorage.sonId = res.data.data.sonId;
          } else {
            localStorage.removeItem("sonId");
          }

          if (localStorage.getItem("urls") == "All") {
            return;
          } else {
            var urls = JSON.parse(localStorage.getItem("urls"));
            var isRoles = false;
            urls.map(u => {
              if (this.$route.path == u) {
                isRoles = true;
              }
            });
            if (!isRoles) {
              this.$router.push("/index");
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
