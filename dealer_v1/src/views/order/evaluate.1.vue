<template>
    <div class="evaluate">
        <div class="evaluate-box">
            <div class="evaluate-id">
                <span>订单ID：</span>XS0001
            </div>
            <div class="star clearfix">
                <div class="evaluate-name">
                    <p>商品没错没错吗没错没错吗商品没错没错吗没错没错吗商品没错没错吗没错没错吗</p>
                </div>
                <div class="play-star">
                    <el-rate v-model="star"></el-rate>
                </div>
            </div>
            <div class="evaluate-content">
                <textarea name="" id="evaluate-text" cols="30" rows="10" placeholder="请输入评价"></textarea>
            </div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <div class="evaluate-box">
            <div class="evaluate-id">
                <span>订单ID：</span>XS0001
            </div>
            <div class="star clearfix">
                <div class="evaluate-name">
                    <p>商品没错没错吗没错没错吗商品没错没错吗没错没错吗商品没错没错吗没错没错吗</p>
                </div>
                <div class="play-star">
                    <el-rate v-model="star"></el-rate>
                </div>
            </div>
            <div class="evaluate-content">
                <textarea name="" id="evaluate-text" cols="30" rows="10" placeholder="请输入评价"></textarea>
            </div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                star:null,
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        components: {

        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style scoped lang="scss">
.evaluate-box{
    width: 1000px;
    margin: 60px auto;
    padding: 15px 30px;
    .evaluate-id{
        padding: 10px 0;
        span{
            font-weight: 600;
        }
    }
    .star{
        div{
            float: left;
        }
        .evaluate-name{
            padding: 0 30px;
        }
    }
    .evaluate-content{
        margin: 15px 0;
        textarea{
            width: 100%;
            height: 100px;
            border: 1px solid #e6e6e6;
            padding-left:15px ;
        }
    }
}

</style>
