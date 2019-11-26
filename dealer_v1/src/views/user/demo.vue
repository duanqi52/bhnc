<!-- 组件说明 -->
<template>
    <div class=''>
            <input type="file" @click="up(1)">
    </div>
</template>

<script>
    import url from '@/serverAPI.config.js'
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {
            up(id){
                 this.$http({
                    url:`${url.amendUser}/${id}`,
                    data:this.user,
                    method:"put"
                })
                .then(res=>{
                    console.log(res)
                })
            }
        },
    }
</script>

<style lang='scss' scoped>
//@import url()

</style>