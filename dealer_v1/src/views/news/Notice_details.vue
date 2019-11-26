<template>
  <div>
    <el-select
      v-model="chooseData"
      multiple
      placeholder="请选择"
      style="width: 300px"
      @change="selectAll"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectOptions: [
        { value: "ALL_SELECT", label: "全选" },
        { value: "1", label: "苹果" },
        { value: "2", label: "橘子" },
        { value: "3", label: "葡萄" },
        { value: "4", label: "西瓜" },
        { value: "5", label: "芒果" },
        { value: "6", label: "山竹" }
      ],
      oldChooseData: [],
      chooseData: []
    };
  },
  methods: {
    selectAll(val) {
      const allValues = this.selectOptions.map(item => {
        return item.value;
      });
      // 用来储存上一次选择的值，可进行对比
      const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];

      // 若选择全部
      if (val.includes("ALL_SELECT")) {
        this.chooseData = allValues;
      }

      // 取消全部选中， 上次有， 当前没有， 表示取消全选
      if (oldVal.includes("ALL_SELECT") && !val.includes("ALL_SELECT")) {
        this.chooseData = [];
      }

      // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes("ALL_SELECT") && val.includes("ALL_SELECT")) {
        const index = val.indexOf("ALL_SELECT");
        val.splice(index, 1); // 排除全选选项
        this.chooseData = val;
      }

      // 全选未选，但是其他选项都全部选上了，则全选选上
      if (!oldVal.includes("ALL_SELECT") && !val.includes("ALL_SELECT")) {
        if (val.length === allValues.length - 1) {
          this.chooseData = ["ALL_SELECT"].concat(val);
        }
      }

      // 储存当前选择的最后结果 作为下次的老数据
      this.oldChooseData = this.chooseData;
    }
  }
};
</script>