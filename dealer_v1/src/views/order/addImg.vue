<template>
  <div id="bhncAddImg">
    <div class="add-img">
      <img :src="addImg" alt @click="onPickFile" v-if="add" />

      <!-- accept：限制图片属性 -->
      <input type="file" ref="fileInput" accept="image/*" style="display: none" />

      <img :src="showImg" alt />

      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      {{value1}}
      <button @click="clearContent()">清空</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clear: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      value1: [],
      addImg: require("../../assets/img/add.png"),
      showImg: require("../../assets/img/222.png"),
      add: true
    };
  },
  methods: {
    clearContent() {
      this.value1 = "";
    },
    //用图片代替file上传
    onPickFile() {
      this.$refs.fileInput.click();
    }
  }
};
</script>

<style scoped lang="scss">
#bhncAddImg {
  .add-img {
    text-align: center;
    line-height: 30px;
    img {
      width: 50px;
    }
  }
}
</style>
