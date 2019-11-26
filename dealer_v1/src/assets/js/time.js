function addZero(n){
    if(n >= 0 && n < 10){
        return '0' + n;
    }else{
        return n;
    }
}
function getTime(){
    let date = new Date();
    let aWeek = ['日','一','二','三','四','五','六'];
    return date.getFullYear() + '年' + addZero(date.getMonth() + 1) + '月' + addZero(date.getDate()) + '日,星期' +aWeek[date.getDay()];
}
export var times = getTime();