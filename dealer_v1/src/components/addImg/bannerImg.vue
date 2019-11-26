<template>
    <div>
        <div>
            <div class="upload-img">
                <ul class="load-list">
                    <li  v-for="(item,index) in imgArr" :key="index">
                        <div class="load-container">
                            <img :src="item" style="width:150px;">
                            <span @click="delImg(index)"><i class="iconfont"><img :src="removeImg" style="width:50px;" id="remove"></i></span>
                        </div>
                    </li>
                    <li class="img-upload" v-if="allowAddImg">
                        <div class="only-add">
                            <div class="load-add" @click="upload()">
                                <i class="iconfont"><img :src="addImg" style="width:100px;"></i>
                                <input type="file" accept="image/*" multiple="multiple" style="display: none" @change="changeImg($event)"
                                        ref="uploadImages">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                addImg:require('../../assets/img/add.png'),
                removeImg:require('../../assets/img/remove.png'),
                imgArr: [],        // 存放临时图片的数组
                allowAddImg: true,   // 上传达到限制后隐藏上传按钮
                imgData: '',        
                imgSrc: ''
            }
        },
        methods: {
            upload () {
            // 调起input选择框
            this.$refs.uploadImages.click()
            },
            changeImg(e) {
                var _this = this;
                var imgLimit = 1024;
                var files = e.target.files;
                var image = new Image();
                if (files.length > 0) {
                    var dd = 0;
                    var timer = setInterval(function () {
                        if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
                            return false;
                        }
        
                        if (files.item(dd).size > imgLimit * 102400) {
                            //to do sth
                        } else {
                            image.src = window.URL.createObjectURL(files.item(dd));
                            image.onload = function () {
                                // 默认按比例压缩
                                var w = image.width,
                                    h = image.height,
                                    scale = w / h;
                                w = 200;
                                h = w / scale;
                                // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
                                var quality = 0.7;
                                //生成canvas
                                var canvas = document.createElement('canvas');
                                var ctx = canvas.getContext('2d');
                                // 创建属性节点
                                var anw = document.createAttribute("width");
                                anw.nodeValue = w;
                                var anh = document.createAttribute("height");
                                anh.nodeValue = h;
                                canvas.setAttributeNode(anw);
                                canvas.setAttributeNode(anh);
                                ctx.drawImage(image, 0, 0, w, h);
                                var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
                                var base64 = canvas.toDataURL("image/" + ext, quality);
                            // 回调函数返回base64的值
                                if (_this.imgArr.length <= 4) {
                                    _this.imgArr.push('');
                                    _this.imgArr.splice(-1, 1, base64);//替换数组数据的方法，此处不能使用：this.imgArr[index] = url;
                                    if (_this.imgArr.length >= 5) {
                                    _this.allowAddImg = false;
                                    }
                                }
                            }
                        }
        
                        if (dd < files.length - 1) {
                                dd++;
                            } else {
                                clearInterval(timer);
                            }
                    }, 1000)
            
                    }
                },
                // 删除图片
                delImg (n) {
                    this.imgArr.splice(n,1);
                    if(this.imgArr.length<5){
                        this.allowAddImg = true;
                    }
                }
            }
        }



  
</script>

<style scoped>
img{
    width: 500px;
}

 
</style>
