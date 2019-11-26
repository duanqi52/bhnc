<template>
    
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){
        var id = this.$route.query.id;
        if(this.$route.query.visitorId){
            localStorage.VISITOR=this.$route.query.visitorId;
        }
        var username =localStorage.username;
        var roles = localStorage.roles;
        var VISITOR = localStorage.VISITOR;
        var Authorization = localStorage.Authorization;
        var ID = localStorage.ID;
        var urls = `${url.detailUrl}/`+id+'.html?to=to';
        if(username){
            urls += "&u="+username;
        }
        if(roles){
            urls += "&r="+roles;
        }
        if(VISITOR){
            urls += "&V="+VISITOR;
        }
        if(Authorization){
            urls += "&A="+Authorization;
        }
        if(ID){
            urls += "&Id="+ID;
        }

        location.href=urls;
    }

}
</script>
