<template>
    
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){
     
        
        // if(this.$route.query.ids){
        //     console.log(this.$route.query.ids);
        //     this.$router.push('/allGoods?ids='+this.$route.query.ids)
        // }else{
    
        //     this.$router.push('/allGoods?input='+this.$route.query.input+"&scope="+this.$route.query.scope)
        // }
        if(this.$route.query.ids){      
            this.$router.push('/allGoods?ids='+this.$route.query.ids)
        }else{
    
            this.$router.push('/allGoods?input='+this.$route.query.input+"&scope="+this.$route.query.scope)
        }
        
    }

}
</script>
