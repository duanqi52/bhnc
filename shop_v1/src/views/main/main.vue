<template>
  <div class="main">
      
      <el-container>
        <header class="Twoheader">
            <Header id="topHeader"></Header>
        </header>
        <el-main class="main">
           
            <router-view></router-view>
        </el-main>
        <el-footer class="footer">
            <Footer></Footer>
        </el-footer>
      </el-container>
  </div>
</template>

<script>
import Header from '@/components/header';
import Footer from '@/components/footer';


export default {
  components: {
      Header,
      Footer,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.Twoheader{
    // height: 150px!important;
    // border-bottom: 15px solid #3d91e7;
    // background-color: white;
}
.main{
    padding: 0!important;
    min-height: 500px;
    background-color: rgb(242, 242, 242);
}
.footer{
    padding: 0;
}
</style>
