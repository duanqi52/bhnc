<template>
    <div class="page">
        <el-row style="height:100%">
            <Header></Header>
            <!-- <el-col :span="3" style="height:100%">
                
                <nav-menu style="height:100%;background:#fff;border-right:1px solid #e6e6e6;"></nav-menu>
            </el-col> -->
            <div class="nav-box">
                <nav-menu></nav-menu>
            </div>
            <!-- <el-col :span="21" style="height:100%;">
                        
                        <router-view></router-view>
                        
            </el-col> -->
            <div class="content">
                  <router-view></router-view>
            </div>    
        </el-row>
    </div>
</template>

<script>
    import Header from '@/components/common/header'
    import api from '../../api/api.js'
    import navMenu from '@/components/common/navMenu'
    export default {
        data () {
            return {
                levelList: null
            }
        },
        components: {
            Header,
            navMenu
        },
        watch:{
            $route(to, from) {
                this.getBreadcrumb();
                this.onSearch()
            }
        },
        mounted() {
            this.getBreadcrumb()
        },
        methods: {
            /*
            getMenu(){
                this.$http.get(this.apiUrl + 'menu')
                .then((response)=>{
                    this.menuData = response.data
                })
                .catch(err=>{
                    console.log(err)
                })   
            }
            */ 
           // 面包屑导航
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0]
                if (first && first.name !== '首页') {
                    matched = [{path: '/', meta: { title: '首页' }}].concat(matched)
                }
                this.levelList = matched;
            },
            onSearch() {
                const loading = this.$loading({
                    lock: true,
                    text: '努力加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                    target: document.querySelector('body')
                });
                setTimeout(() => {
                    loading.close();
                }, 500);
            }  
        },
    }
</script>
<style lang="scss">
.nav-box {
    // width: 11.5%;
    width: 320px;
  li {
    // margin-left: 110px!important;
  }
}
.nav-box .el-menu-item{
  height: 75px;
  line-height: 75px;
}
</style>

<style scoped lang="scss">
    $background:#2d3a4b;
    $borderColor:skyblue;
    .menu-Bar{
        border-right: 1px solid $borderColor;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        height: auto;
    }
    .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
  transform: translateX(10px);
  opacity: 0;
}
.el-breadcrumb{
    padding: 5px 8px;
    border-bottom: 1px solid $background;
    span{
        
        font-size: 14px;
        a{
            display: inline-block;
            padding: 5px 8px;
        }
    }
}
.el-col-3 {
    width: 11.5%;
}
.el-col-21 {
    width: 88.5%;
}
.nav-box{
    width: 320px;
    height: 100%;
    position: fixed;
    top: 140px;
    left: 0;
    border-right: 1px solid #e6e6e6;
    background-color: white;
}
.content{
    min-width: 1300px;
    min-height: 940px;
    border: 12px solid #F0F0F0;
    margin-left: 320px;
}

</style>
