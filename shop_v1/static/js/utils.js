export default {
    toDetailsss: function(goods){
        // console.log(goods.id);
        let goodsID = goods.id
        location.href='/web/shop/details?id='+goodsID;
       // router.push({ path: '/shop/details'});
        // alert('a');
    }

}
