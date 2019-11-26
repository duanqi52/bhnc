<!-- 组件说明 -->
<template>
  <div id="bhncPostTrade">
    <div class="trade">
      <div class="trade-box">
        <div class="trade-content" style="border-bottom: 15px solid #F0F0F0;">
          <div>
            <div class="tiele_type">
              <span class="tiele_type_a">1</span>为您的商品选择合适的类型
            </div>
            <div class="comm">
              <el-radio v-model="goods.public_products" label="1">大市场产品</el-radio>
              <span style="color: rgba(208,208,208,1);">( 大市场类型商品即公开售卖商品，会出现在搜索、旺铺等买家导购路径中 )</span>
            </div>
            <div class="comm">
              <el-radio v-model="goods.public_products" label="2">非公开产品</el-radio>
              <span style="color: rgba(208,208,208,1);">( 不会出现在大市场搜索中 )</span>
            </div>
          </div>
          <div>
            <div class="tiele_type">
              <span class="tiele_type_a">2</span>为您的商品选择合适的类目
            </div>
            <div class="comm_a">
              <div class="oneStair">
                <span style="color:#999999;margin-right: 30px;">一级类目</span>
                <el-radio-group v-model="oneStair"  @change="changeHandler">
                  <el-radio label="成品笔" >成品笔</el-radio>
                  <el-radio label="笔芯" >笔芯</el-radio>
                  <el-radio label="零部件" >零部件</el-radio>
                  <el-radio label="机械设备" >机械设备</el-radio>
                  <el-radio label="配套加工" >配套加工</el-radio>
                </el-radio-group>
              </div>
              <!-- 成品笔1 -->
         <div v-if="oneStair == '成品笔'">
                <div class="allStair">
                  <div class="allStair-hade">
                    <span class="towStair">二级类目</span>
                    <span style="color:#999999;margin-right: 30px;padding: 15px 30px 15px 12px;" >三级类目</span>
                  </div>
                			<div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{ goodsSpeList[0].name}}分类</span>
                    <el-radio-group v-model="pen.type.start_mode" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio v-for="item in goodsSpeList[0].goods_specification_values" :key="item.id"
                        :label="item.name"
                        :value="item.name" 
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[1].name}}分类</span>
                    <el-radio-group v-model="pen.type.texture" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[1].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <!-- 功能、油墨 -->
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[2].name}}分类</span>
                    <el-radio-group v-model="pen.type.function" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[2].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[3].name}}分类</span>
                    <el-radio-group v-model="pen.type.ink" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[3].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <!-- 笔芯替换、笔芯数量 -->
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[4].name}}分类</span>
                    <el-radio-group v-model="pen.type.cartridge_replacement" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[4].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[5].name}}分类</span>
                    <el-radio-group v-model="pen.type.cartridge_count" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[5].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <!-- 造型、笔杆外形 -->
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[6].name}}分类</span>
                    <el-radio-group v-model="pen.type.sculpt" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[6].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{goodsSpeList[7].name}}分类</span>
                    <el-radio-group v-model="pen.type.outline" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[7].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <!-- 搭配配件、表面工艺 、品牌-->
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{ goodsSpeList[8].name}}分类</span>
                    <el-radio-group v-model="pen.type.match_accessories" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[8].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{ goodsSpeList[9].name}}分类</span>
                    <el-radio-group v-model="pen.type.technology" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[9].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  <div class="allStair-body">
                    <span class="erjiStair" v-if="goodsSpeList.length>0">按{{ goodsSpeList[10].name}}分类 (选填)</span>
                    <el-radio-group v-model="pen.type.brand" class="fuxuan" @change="changeHandlerType" v-if="goodsSpeList.length>0">
                      <el-radio
                        v-for="item in goodsSpeList[10].goods_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  
                  
                </div>
              </div>
              <!-- 笔芯1 -->
              <div v-if="oneStair == '笔芯'">
                <div class="allStair">
                  <div class="allStair-hade">
                    <span class="towStair">二级类目</span>
                    <span
                      style="color:#999999;margin-right: 30px;padding: 15px 30px 15px 12px;"
                    >三级类目</span>
                  </div>
                  <!-- 笔芯 -->
                  <div class="allStair-body">
                    <span class="erjiStair">按{{cartridgeList[0].name}}分类</span>
                    <el-radio-group v-model="cartridge.type.cartridge_ink" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in cartridgeList[0].goods_cartridge_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                   <div class="allStair-body">
                    <span class="erjiStair">按{{cartridgeList[1].name}}分类</span>
                    <el-radio-group v-model="cartridge.type.cartridge_pen_point" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in cartridgeList[1].goods_cartridge_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                   <div class="allStair-body">
                    <span class="erjiStair">按{{cartridgeList[2].name}}分类</span>
                    <el-radio-group v-model="cartridge.type.cartridge_pipeline" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in cartridgeList[2].goods_cartridge_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                   <div class="allStair-body">
                    <span class="erjiStair">按{{cartridgeList[3].name}}分类</span>
                    <el-radio-group v-model="cartridge.type.cartridge_line_width" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in cartridgeList[3].goods_cartridge_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                     <div class="allStair-body">
                    <span class="erjiStair">按{{cartridgeList[4].name}}分类 (选填)</span>
                    <el-radio-group v-model="cartridge.type.cartridge_brand" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in cartridgeList[4].goods_cartridge_specification_values"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                  
                </div>
                <!-- <p>
                  您当前选择的类目：
                  <span
                    style="color:#FC9263"
                  >笔芯 > [( 油墨 > 圆珠笔芯 )、( 笔头 > 子弹头笔芯 )、( 油管 > 塑料杆笔芯 )、( 线幅 > 0.28笔芯 )、( 品牌 > 周鲁白笔芯 )]</span>
                </p> -->
              </div>
              <!-- 零部件 -->
              <div v-if="oneStair == '零部件'">
                <div class="allStair">
                  <div class="allStair-hade">
                    <span class="towStair">二级类目</span>
                    <span style="color:#999999;margin-right: 30px;padding: 15px 30px 15px 12px;" >三级类目</span>
                  </div>
                  <!-- 零部件二级 -->
                  <div class="allStair-body" >
                    <span class="erjiStair">按{{mountingsList[0].name}}分类</span>
                    <el-radio-group v-model="parts.type.parts" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in mountingsList[0].goods_mountings_specification_value_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                    <div class="allStair-body" >
                    <span class="erjiStair">按{{mountingsList[1].name}}分类</span>
                    <el-radio-group v-model="parts.type.cartridge_mountings" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in mountingsList[1].goods_mountings_specification_value_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                    <div class="allStair-body" >
                    <span class="erjiStair">按{{mountingsList[2].name}}分类</span>
                    <el-radio-group v-model="parts.type.packaging" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in mountingsList[2].goods_mountings_specification_value_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                    <div class="allStair-body" >
                    <span class="erjiStair">按{{mountingsList[3].name}}分类</span>
                    <el-radio-group v-model="parts.type.raw_material" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in mountingsList[3].goods_mountings_specification_value_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                </div>              
              </div>
              <!-- 机械设备1 -->
              <div v-if="oneStair == '机械设备'">
                <div class="allStair">
                  <div class="allStair-hade">
                    <span class="towStair">二级类目</span>
                    <span
                      style="color:#999999;margin-right: 30px;padding: 15px 30px 15px 12px;"
                    >三级类目</span>
                  </div>                
                  <div class="allStair-body">
                    <span class="erjiStair">机械设备</span>
                    <el-radio-group v-model="mechanical.type.mechanical" class="fuxuan" @change="changeHandlerType">
                      <el-radio
                        v-for="item in mechanicalList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <!-- 配套加工1 -->
              <div v-if="oneStair == '配套加工'">
                <div class="allStair">
                  <div class="allStair-hade">
                    <span class="towStair">二级类目</span>
                    <span
                      style="color:#999999;margin-right: 30px;padding: 15px 30px 15px 12px;"
                    >三级类目</span>
                  </div>
                  <!-- processingList-->
                 <div class="allStair-body" >
                    <span class="erjiStair">按{{processingList[0].name}}分类</span>
                    <el-radio-group v-model="accessory.type.surface_treatment" class="fuxuan" @change="changeHandlerType">
                      <el-radio  v-for="item in processingList[0].goods_processing_specification_values" :key="item.id"
                        :label="item.name" :value="item.name" >
                      </el-radio>
                    </el-radio-group>
                  </div>
                     <div class="allStair-body" >
                    <span class="erjiStair">按{{processingList[1].name}}分类</span>
                    <el-radio-group v-model="accessory.type.printing_technology" class="fuxuan" @change="changeHandlerType">
                      <el-radio v-for="item in processingList[1].goods_processing_specification_values" :key="item.id"
                        :label="item.name" :value="item.name"  >
                      </el-radio>
                    </el-radio-group>
                  </div>
                     <div class="allStair-body" >
                    <span class="erjiStair">按{{processingList[2].name}}分类</span>
                    <el-radio-group v-model="accessory.type.mould_process" class="fuxuan" @change="changeHandlerType">
                      <el-radio v-for="item in processingList[2].goods_processing_specification_values" :key="item.id"
                        :label="item.name" :value="item.name" >
                      </el-radio>
                    </el-radio-group>
                  </div>
                </div>           
              </div>
              <p> 您当前选择的类目： <span style="color:#FC9263" >{{showType}}</span> </p>
            </div>
          </div>
        </div>
        
        <div class="trade-title">
          <h2>基本信息</h2>
        </div>
        <div class="trade-content" style="border-bottom: 15px solid rgb(240, 240, 240);">
          <ul>
            <li>
              <span class="title-hadeing">
                <span style="color:#FF0000;margin: 0 5px;">*</span>信息标题
              </span>
              <el-input
                v-model="goods.title"
                placeholder="建议使用通俗的产品名称，突出商品特性，卖点和优惠，请勿使用“最，第一”等违规词汇"
                type="text"
                maxlength="60"
                show-word-limit
              ></el-input>
              <span style="color: #0063FF;font-size: 14px;cursor: pointer;">
                填写建议
                <i class="iconfont icon-post" style="color: #0063FF;font-size: 14px;"></i>
              </span>
            </li>
          </ul>
          <div>
            <span class="title-hadeing">产品属性</span>
            <i style="color:#999999;">产品属性描述错误或不完整，可能会导致商品审核不通过，或搜索流量减少，请准确完整填写</i>
          </div>
          <ul class="property-name">
            <!-- 成品笔产品属性 -->
            <li class="property-name-li" v-if="oneStair == '成品笔'">
              <div style="width: 100%;">
                <span class="property-name-fu">
                  <span class="property-name-tit">品牌</span>
                  <el-input v-model="pen.attribute.goods_brand" placeholder="请输入商品品牌" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">型号</span>
                  <el-input v-model="pen.attribute.style_number" placeholder="请输入商品型号" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">货号</span>
                  <el-input v-model="pen.attribute.cargo_label" placeholder="请输入商品货号" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">笔杆材质</span>
                  <el-select
                    v-model="pen.attribute.shell_texture"
                    placeholder="请选择笔杆材质"
                    class="width-input"
                  >
                    <el-option
                      v-for="item in shellTextureList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">笔身长度</span>
                  <el-input
                    v-model="pen.attribute.barrel_length"
                    placeholder="请输入商品笔身长度"
                    class="width-input"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">笔身重量</span>
                  <el-input
                    v-model="pen.attribute.barrel_weight"
                    placeholder="请输入商品笔身重量"
                    class="width-input"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">包装形式</span>
                  <el-input
                    v-model="pen.attribute.packaged_from"
                    placeholder="请输入商品包装形式"
                    class="width-input"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">外箱尺寸</span>
                  <el-input
                    v-model="pen.attribute.outer_size"
                    placeholder="请输入商品外箱尺寸"
                    class="width-input"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">包装数量</span>
                  <el-input
                    v-model="pen.attribute.packaged_quantity"
                    placeholder="请输入商品包装数量"
                    class="width-input"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">毛净重</span>
                  <el-input
                    placeholder="请输入净重"
                    class="width-input"
                    type="number"
                    v-model="pen.attribute.fur_weigth"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">是否进口</span>
                  <el-select v-model="pen.attribute.is_import" placeholder="请选择是否进口" class="width-input">
                    <el-option
                      v-for="item in isExport"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">加工定制</span>
                  <el-select
                    v-model="pen.attribute.processing_customization"
                    placeholder="请选择是否加工定制"
                    class="width-input"
                  >
                    <el-option
                      v-for="item in isCustomized"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">起订量</span>
                  <el-input
                    v-model="pen.attribute.start_quantity"
                    placeholder="请输入商品起订量"
                    class="width-input"
                  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">用途</span>
                  <el-select v-model="pen.attribute.purpose" placeholder="请选择用途" class="width-input">
                    <el-option
                      v-for="item in isPurpose"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </span>
                <span style="position: relative;width: 100%;display: inline-block;">
                  <span class="property-name-fu">
                    <span class="property-name-tit">送礼场合</span>
                    <el-select multiple v-model="pen.attribute.present" class="width-input">
                      <el-option
                        v-for="item in presentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </span>
                  <i style="display: inline-block;position: absolute;top: 20px;left: 41%;">(可多选)</i>
                </span>          
              </div>
              <!-- 自定义添加属性 -->
              <div v-for="(spe,index) in speList" :key="index">
                <div style="width: 100%;display: flex;justify-content: left;">
                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-left: 80px;margin-top: 30px;"
                    v-if="speList[index][0]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][0].add"
                    >
                      <p @click="addSpe(index,0)"  style="line-height:1;cursor: pointer;color:#fc9263;" >
                        <i style="display:inline-block;width:20px;height:20px;font-size:18px;color:#fc9263;border:1px dashed #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][0].save">{{speList[index][0].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][0].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][0].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,0)"
                        v-if="speList[index][0].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>

                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-top: 30px;"
                    v-if="speList[index][1]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][1].add"
                    >
                      <p
                        @click="addSpe(index,1)"
                        style="line-height:1;cursor: pointer;color: #fc9263;"
                      >
                        <i
                          style="display:inline-block;width:20px;height:20px;font-size:18px;color: #fc9263;border:1px dashed  #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][1].save">{{speList[index][1].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][1].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][1].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,1)"
                        v-if="speList[index][1].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>
                </div>
              </div>
            </li>
            <!-- 笔芯产品属性 -->
            <li class="property-name-li" v-if="oneStair == '笔芯'">
              <div style="width: 100%;">
                <span class="property-name-fu">
                  <span class="property-name-tit">品牌</span>
                  <el-input v-model="cartridge.attribute.goods_brand" placeholder="请输入商品品牌" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">型号</span>
                  <el-input v-model="cartridge.attribute.style_number" placeholder="请输入商品型号" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">货号</span>
                  <el-input v-model="cartridge.attribute.cargo_label" placeholder="请输入商品货号" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">油管直径</span>
                  <el-input
                    v-model="cartridge.attribute.vitta_diameter" placeholder="请输入商品油管直径" class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">油管长度</span>
                  <el-input  v-model="cartridge.attribute.vitta_length"  placeholder="请输入商品油管长度" class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">书写长度</span>
                  <el-input  v-model="cartridge.attribute.write_length" placeholder="请输入商品书写长度" class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">笔头材质</span>
                  <el-input v-model="cartridge.attribute.pen_point_texture"  placeholder="请输入商品笔头材质" class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">线幅</span>
                  <el-input v-model="cartridge.attribute.line_width" placeholder="请输入商品线幅" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">保质期</span>
                  <el-input v-model="cartridge.attribute.expiration_date" placeholder="请输入商品保质期" class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">是否进口</span>
                  <el-select v-model="cartridge.attribute.is_import" placeholder="请选择是否进口" class="width-input">
                    <el-option
                      v-for="item in isExport"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">包装形式</span>
                  <el-input placeholder="请输入包装形式"  class="width-input"    v-model="cartridge.attribute.packaged_from" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">包装规格</span>
                  <el-input  placeholder="请输入包装规格"  class="width-input"   v-model="cartridge.attribute.packaged_specification" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">净重</span>
                  <el-input placeholder="请输入净重" class="width-input"  type="number"  v-model="cartridge.attribute.suttle"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">是否可擦</span>
                  <el-select v-model="cartridge.attribute.whether_erasable" placeholder="请选择是否可擦" class="width-input">
                    <el-option
                      v-for="item in isErasable"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">是否快干</span>
                  <el-select  v-model="cartridge.attribute.whether_quick_drying"  placeholder="请选择是否快干" class="width-input" >
                    <el-option
                      v-for="item in isQuickdrying"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">是否防水</span>
                  <el-select v-model="cartridge.attribute.whether_waterproof" placeholder="请选择是否防水" class="width-input" >
                    <el-option
                      v-for="item in isWaterproof"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">加印Logo</span>
                  <el-select v-model="cartridge.attribute.printing_logo" placeholder="请选择是否加印Logo"  class="width-input" >
                    <el-option
                      v-for="item in isPrintList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">加工定制</span>
                  <el-select v-model="cartridge.attribute.processing_customization"  placeholder="请选择是否加工定制" class="width-input" >
                    <el-option
                      v-for="item in isCustomized"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">起订量</span>
                  <el-input v-model="cartridge.attribute.start_quantity"  placeholder="请输入商品起订量" class="width-input" ></el-input>
                </span>
              </div>
              <!-- 自定义添加属性 -->
              <div v-for="(spe,index) in speList" :key="index">
                <div style="width: 100%;display: flex;justify-content: left;">
                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-left: 80px;margin-top: 30px;"
                    v-if="speList[index][0]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][0].add"
                    >
                      <p
                        @click="addSpe(index,0)"
                        style="line-height:1;cursor: pointer;color:#fc9263;"
                      >
                        <i
                          style="display:inline-block;width:20px;height:20px;font-size:18px;color:#fc9263;border:1px dashed #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][0].save">{{speList[index][0].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][0].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][0].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,0)"
                        v-if="speList[index][0].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>

                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-top: 30px;"
                    v-if="speList[index][1]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][1].add"
                    >
                      <p
                        @click="addSpe(index,1)"
                        style="line-height:1;cursor: pointer;color: #fc9263;"
                      >
                        <i
                          style="display:inline-block;width:20px;height:20px;font-size:18px;color: #fc9263;border:1px dashed  #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][1].save">{{speList[index][1].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][1].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][1].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,1)"
                        v-if="speList[index][1].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>
                </div>
              </div>
            </li>
            <!-- 制笔配件产品属性 -->
            <li class="property-name-li" v-if="oneStair == '零部件'">
              <div style="width: 100%;">
                <span class="property-name-fu">
                  <span class="property-name-tit">品牌</span>
                  <el-input v-model="parts.attribute.goods_brand" placeholder="请输入商品品牌" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">型号</span>
                  <el-input v-model="parts.attribute.style_number" placeholder="请输入商品型号" class="width-input"></el-input>
                </span>               
                <span class="property-name-fu">
                  <span class="property-name-tit">材质</span>
                  <el-input v-model="parts.attribute.texture" placeholder="请输入商品材质" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">包装形式</span>
                  <el-input  placeholder="请输入包装形式" class="width-input"   v-model="parts.attribute.packaged_from"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">产品用途</span>
                  <el-input  placeholder="请输入产品用途" class="width-input"    v-model="parts.attribute.product_usage" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">加印Logo</span>
                  <el-select  v-model="parts.attribute.printing_logo" placeholder="请选择是否加印Logo" class="width-input" >
                    <el-option  v-for="item in isPrintList"  :key="item.value" :label="item.label" :value="item.value"  ></el-option>
                  </el-select>
                </span>
              </div>
              <!-- 自定义添加属性 -->
              <div v-for="(spe,index) in speList" :key="index">
                <div style="width: 100%;display: flex;justify-content: left;">
                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-left: 80px;margin-top: 30px;"
                    v-if="speList[index][0]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][0].add"
                    >
                      <p
                        @click="addSpe(index,0)"
                        style="line-height:1;cursor: pointer;color:#fc9263;"
                      >
                        <i
                          style="display:inline-block;width:20px;height:20px;font-size:18px;color:#fc9263;border:1px dashed #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][0].save">{{speList[index][0].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][0].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][0].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,0)"
                        v-if="speList[index][0].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>

                  <span  style="width: 40%;position:relative;margin-right: 60px;margin-top: 30px;" v-if="speList[index][1]" >
                    <span style="width: 65%;text-align: center;color: #666666;padding-top:20px;"  v-if="!speList[index][1].add" >
                      <p @click="addSpe(index,1)"  style="line-height:1;cursor: pointer;color: #fc9263;" >
                        <i style="display:inline-block;width:20px;height:20px;font-size:18px;color: #fc9263;border:1px dashed  #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p style="font-size:12px;line-height:1;margin-top:10px;color:#999" >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][1].save">{{speList[index][1].name}}：</span>
                      <span v-else>
                        <el-input  v-model="speList[index][1].name"  placeholder="属性名" style="width: 100px"  ></el-input>
                      </span>
                      <el-input v-model="speList[index][1].value"  placeholder="属性值" class="width-input"  ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i @click="deleteSpe(index,1)" v-if="speList[index][1].add" class="delBtns iconfont icon-jian"  ></i>
                    </span>
                  </span>
                </div>
              </div>
            </li>
            <!-- 机械设备产品属性 -->
            <li class="property-name-li" v-if="oneStair == '机械设备'">
              <div style="width: 100%;">
                <span class="property-name-fu">
                  <span class="property-name-tit">型号</span>
                  <el-input v-model="mechanical.attribute.style_number" placeholder="请输入商品型号" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">货号</span>
                  <el-input v-model="mechanical.attribute.cargo_label" placeholder="请输入商品货号" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">材质</span>
                  <el-input v-model="mechanical.attribute.texture" placeholder="请输入商品材质" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">外形尺寸</span>
                  <el-input v-model="mechanical.attribute.boundary_size"  placeholder="请输入商品外形尺寸" class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">重量</span>
                  <el-input v-model="mechanical.attribute.weight" placeholder="请输入商品重量" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">品牌</span>
                  <el-input v-model="mechanical.attribute.goods_brand" placeholder="请输入商品品牌" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">功率</span>
                  <el-input v-model="mechanical.attribute.power" placeholder="请输入商品功率" class="width-input"></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">输送能力</span>
                  <el-input v-model="mechanical.attribute.transmittability"  placeholder="请输入商品输送能力"  class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">输送距离</span>
                  <el-input  v-model="mechanical.attribute.transmission_distance" placeholder="请输入商品输送距离" class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">功能用途</span>
                  <el-input v-model="mechanical.attribute.function_use" placeholder="请输入商品功能用途" class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">免费维修期</span>
                  <el-input  v-model="mechanical.attribute.free_maintenance" placeholder="请输入商品免费维修期"  class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">使用寿命</span>
                  <el-input v-model="mechanical.attribute.service_life"  placeholder="请输入商品使用寿命" class="width-input" ></el-input>
                </span>
              </div>
              <!-- 自定义添加属性 -->
              <div v-for="(spe,index) in speList" :key="index">
                <div style="width: 100%;display: flex;justify-content: left;">
                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-left: 80px;margin-top: 30px;"
                    v-if="speList[index][0]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][0].add"
                    >
                      <p
                        @click="addSpe(index,0)"
                        style="line-height:1;cursor: pointer;color:#fc9263;"
                      >
                        <i
                          style="display:inline-block;width:20px;height:20px;font-size:18px;color:#fc9263;border:1px dashed #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][0].save">{{speList[index][0].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][0].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][0].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,0)"
                        v-if="speList[index][0].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>

                  <span
                    style="width: 40%;position:relative;margin-right: 60px;margin-top: 30px;"
                    v-if="speList[index][1]"
                  >
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!speList[index][1].add"
                    >
                      <p
                        @click="addSpe(index,1)"
                        style="line-height:1;cursor: pointer;color: #fc9263;"
                      >
                        <i
                          style="display:inline-block;width:20px;height:20px;font-size:18px;color: #fc9263;border:1px dashed  #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p
                        style="font-size:12px;line-height:1;margin-top:10px;color:#999"
                      >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][1].save">{{speList[index][1].name}}：</span>
                      <span v-else>
                        <el-input
                          v-model="speList[index][1].name"
                          placeholder="属性名"
                          style="width: 100px"
                        ></el-input>
                      </span>
                      <el-input
                        v-model="speList[index][1].value"
                        placeholder="属性值"
                        class="width-input"
                      ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i
                        @click="deleteSpe(index,1)"
                        v-if="speList[index][1].add"
                        class="delBtns iconfont icon-jian"
                      ></i>
                    </span>
                  </span>
                </div>
              </div>
            </li>
            <!-- 配套加工产品属性 -->
            <li class="property-name-li" v-if="oneStair == '配套加工'">
              <div style="width: 100%;">
                <span class="property-name-fu">
                  <span class="property-name-tit">加工形式</span>
                  <el-input v-model="accessory.attribute.process_form"  placeholder="请输入商品加工形式" class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">主要加工设备</span>
                  <el-input  v-model="accessory.attribute.main_process_equipment" placeholder="请输入商品主要加工设备"  class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">加工设备数量</span>
                  <el-input v-model="accessory.attribute.process_equipment_quantity"  placeholder="请输入商品加工设备数量" class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">日出货量</span>
                  <el-input v-model="accessory.attribute.sunup_cargo" placeholder="请输入商品日出货量"  class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">年最大加工能力</span>
                  <el-input  v-model="accessory.attribute.year_max_process"  placeholder="请输入商品年最大加工能力" class="width-input"  ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">加工原料</span>
                  <el-input  v-model="accessory.attribute.process_material"  placeholder="请输入商品加工原料"  class="width-input" ></el-input>
                </span>
                <span class="property-name-fu">
                  <span class="property-name-tit">承接加工类型</span>
                  <el-input v-model="accessory.attribute.process_type"  placeholder="请输入商品承接加工类型"  class="width-input" ></el-input>
                </span>
              </div>
              <!-- 自定义添加属性 -->
              <div v-for="(spe,index) in speList" :key="index">
                <div style="width: 100%;display: flex;justify-content: left;">
                  <span  style="width: 40%;position:relative;margin-right: 60px;margin-left: 80px;margin-top: 30px;"  v-if="speList[index][0]"  >
                    <span style="width: 65%;text-align: center;color: #666666;padding-top:20px;"  v-if="!speList[index][0].add" >
                      <p  @click="addSpe(index,0)"  style="line-height:1;cursor: pointer;color:#fc9263;" >
                        <i  style="display:inline-block;width:20px;height:20px;font-size:18px;color:#fc9263;border:1px dashed #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p  style="font-size:12px;line-height:1;margin-top:10px;color:#999"  >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][0].save">{{speList[index][0].name}}：</span>
                      <span v-else>
                        <el-input  v-model="speList[index][0].name"  placeholder="属性名"  style="width: 100px" ></el-input>
                      </span>
                      <el-input v-model="speList[index][0].value"  placeholder="属性值" class="width-input"  ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i  @click="deleteSpe(index,0)"   v-if="speList[index][0].add"  class="delBtns iconfont icon-jian" ></i>
                    </span>
                  </span>

                  <span style="width: 40%;position:relative;margin-right: 60px;margin-top: 30px;"  v-if="speList[index][1]" >
                    <span style="width: 65%;text-align: center;color: #666666;padding-top:20px;"  v-if="!speList[index][1].add" >
                      <p   @click="addSpe(index,1)"   style="line-height:1;cursor: pointer;color: #fc9263;"  >
                        <i  style="display:inline-block;width:20px;height:20px;font-size:18px;color: #fc9263;border:1px dashed  #fc9263;margin-right:17px;"
                        >+</i> 添加自定义产品属性
                      </p>
                      <p  style="font-size:12px;line-height:1;margin-top:10px;color:#999" >有产品属性无法满足需求，可添加产品属性</p>
                    </span>
                    <span style="width: 329px;position:relative;" v-else>
                      <span v-if="speList[index][1].save">{{speList[index][1].name}}：</span>
                      <span v-else>
                        <el-input  v-model="speList[index][1].name"  placeholder="属性名"  style="width: 100px"  ></el-input>
                      </span>
                      <el-input  v-model="speList[index][1].value"  placeholder="属性值" class="width-input"  ></el-input>
                    </span>
                    <span style="position:absolute;top:5px;left:340px;">
                      <i  @click="deleteSpe(index,1)"  v-if="speList[index][1].add"  class="delBtns iconfont icon-jian" ></i>
                    </span>
                  </span>
                </div>
              </div>
            </li>       
          </ul>

          <!-- 上传主图 -->
          <div>
            <div style="width: 100%;">
              <div>
                <span class="title-hadeing">上传主图</span>
                <i style="color:#999999;">建议您上传 750*750 像素以上的实拍大图，包含商品整体款式和商品细节。</i>
                <i
                  style="color:#999999;width: unset;font-size: 14px;color: rgba(252,146,99,1);"
                >最后一张发白底图可增加商品曝光机会，图片文案避免字体侵权</i>
                <span
                  style="width: unset;color: rgb(0, 99, 255); font-size: 14px; cursor: pointer;margin-left: 10px;"
                >
                  查看规范
                  <i
                    class="iconfont icon-post"
                    style="color: rgb(0, 99, 255); font-size: 14px;"
                  ></i>
                </span>
              </div>
            </div>
            <!-- 上传5张主图 -->
            <div style="padding-left: 110px;">
              <!-- 上传主图 -->
              <div class="ivu-upload"  v-for="index in 5" :key="index">
                <div class="ivu-upload-a">                 
                  <img src="../../../static/img/upimgs.png"  @click="onPickFile1(index)" alt v-if="!goods.imgs[index-1]" />                 
                  <span style="position: relative;"  v-if="goods.imgs[index-1]">
                    <img :src="goods.imgs[index-1]" alt class="upimg" style="width: 120px;height: 120px;border: 1px solid #CCCCCC;" />
                    <i class="remove iconfont icon-delete_light" @click="offImg(index-1)"  
                    style="cursor: pointer;position: absolute;font-size: 16px;bottom: 5px;right: 1px;color: red;" ></i>
                  </span>
                  <input type="file" accept="image/*" style="display: none" :id="'lfile'+index" @change="imgUpload($event,index)" />
                </div>
              </div>                                  
            </div>

            <!-- <div style="width: 100%;padding-left: 110px;">
              <div class="upfile-box">
                <div
                  class="up-file"
                  v-for="(item,index) in imgs"
                  :key="index"
                  style="margin-left:4px"
                >
                  <img
                    :src="addImg"
                    alt
                    @click="onPickFile1(index)"
                    v-if="!item.img"
                    style="widht:60px;cursor: pointer;"
                  />
                  <div class="banner-img" v-else>
                    <img :src="item.img" style="width:80px;height:80px" />
                    <img :src="removeImg" class="remove" @click="offImg(index)">
                    <i class="remove iconfont icon-delete_light" @click="offImg(index)"></i>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    style="display: none"
                    :id="'lfile'+index"
                    @change="imgUpload($event,index)"
                  />
                </div>
              </div>
            </div> -->
            <div style="width: 100%;padding-left: 110px;margin-top: 30px;">
              <div style="color:#666666;">
                <span style="float: left;width: 116px;text-align: right;margin-right: 10px;">添加图片关键词</span>
                <el-input
                  v-model="goods.img_antistop"
                  placeholder="请输入图片关键词"
                  type="text"
                  maxlength="40"
                  style="622px"
                  show-word-limit
                ></el-input>
              </div>
              <div style="color:#666666;margin-top: 30px;">
                <span style="float: left;width: 116px;text-align: right;margin-right: 10px;">添加图片描述</span>
                <div class="textarea_a">
                  <el-input
                    type="textarea"
                    placeholder="请输入图片描述"
                    v-model="goods.img_describe"
                    maxlength="200"
                    show-word-limit
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 产品认证 -->
          <div>
            <div style="width: 100%;">
              <div>
                <span class="title-hadeing">产品认证</span>
                <i style="color:#999999;">如您已持有TUV（莱茵）产品认证证书，请填写报告上的纯数字证书号以及Blatt Page纯数字编码（无需空格）</i>
              </div>
            </div>
            <div style="width: 100%;padding-left: 110px;margin-bottom: 10px;" v-for="i in goods.product_certification.length" :key="i">
              <span style="width: 100%;position:relative;" >
                <span>
                  <el-select v-model="goods.product_certification[i-1].name" placeholder="请选择认证机构" @change="authentication(value,i)">
                    <el-option v-for="item in attList[0][0].name" :key="item.value" :label="item.label" :value="item.label" ></el-option>
                  </el-select>
                </span>
                <el-input v-model="goods.product_certification[i-1].value" placeholder="请输入证书编号" style="width: 340px;"></el-input>              
              </span>
               <span v-if="i!='1'">
                      <i  @click="deleteAtt(i)" style="color: #0077FF;margin-left: 10px;cursor: pointer;" >删除</i>
               </span>
            </div>
            <!-- 自定义添加产品认证attList -->
            <div style="width: 100%;padding-left: 110px;">
              <div>
                <div style="width: 100%;">
                  <span style="width: 100%;display: block;margin: 20px 0;" >
                    <span style="width: 65%;text-align: center;color: #666666;padding-top:20px;" >
                      <p @click="addAtt()" style="line-height:1;cursor: pointer;color:#fc9263;text-align: left;"  >
                        <i style="isplay: inline-block;height: 20px;font-size: 14px;color: #0077FF;"  >+ 新增产品认证</i>
                      </p>
                    </span>       
                  </span>

                  <!-- <span style="width: 100%;display: block;margin: 20px 0;" v-if="attList[index][1]">
                    <span
                      style="width: 65%;text-align: center;color: #666666;padding-top:20px;"
                      v-if="!attList[index][1].add"
                    >
                      <p
                        @click="addAtt(index,1)"
                        style="line-height:1;cursor: pointer;color: #fc9263;text-align: left;"
                      >
                        <i
                          style="isplay: inline-block;height: 20px;font-size: 14px;color: #0077FF;"
                        >+ 新增产品认证</i>
                      </p>
                    </span>
                    <span style="width: 100%;position:relative;" v-else>
                      <span v-if="attList[index][1].save">{{attList[index][1].name}}：</span>
                      <span v-else>
                        <el-select v-model="value" placeholder="请选择认证机构">
                          <el-option
                            v-for="item in attList[index][0].name"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </span>
                      <el-input
                        v-model="attList[index][1].value"
                        placeholder="请输入证书编号"
                        style="width: 340px;"
                      ></el-input>
                    </span>
                    <span style>
                      <i
                        @click="deleteAtt(index,1)"
                        v-if="attList[index][1].add"
                        style="color: #0077FF;margin-left: 10px;cursor: pointer;"
                      >删除</i>
                    </span>
                  </span> -->
                </div>
              </div>
            </div>
            <div
              style="width: 65%;margin-left: 110px;padding: 13px 16px;font-size: 14px;color: rgb(252, 146, 99);line-height: 25px;background: #FFFCDF;"
            >填写上栏产品认证证书编号，即为确认授权该证书出具机构等向笔海弄潮提供该证书对应的产品检测认证数据，包括公司名、证书号、地址、类型、检测标准、产品名称、规格参数、证书有效期等并加以展示（如为非自身产品，确认已获取产品方同意可作出前述授权确认），且可超链接自证书出具机构网站，便于用户查询确认。如无法确认，请勿填写</div>
          </div>
          <div v-if="oneStair == '成品笔' || oneStair == '笔芯'">
            <ul>
              <li style="position: relative; " class="priceZone">
                <div style="width: 100%;">
                  <div>
                    <span class="title-hadeing">产品规格：</span>
                    <i style="color:#999999;width: unset;font-size: 14px;color: rgba(252,146,99,1);"  >请规范使用sku属性，如有滥用的行为，商品会被降权</i>
                    <span  style="width: unset;color: rgb(0, 99, 255); font-size: 14px; cursor: pointer;margin-left: 10px;" > 查看规范
                      <i  class="iconfont icon-post" style="color: rgb(0, 99, 255); font-size: 14px;" ></i>
                    </span>
                  </div>
                </div>
                <div class="theWater">
                  <div class="theWaterHade">
                    线幅
                    <span style="font-size:14px;color:rgba(153,153,153,1);">最多支持40个选项</span>
                    <ul>
                      <li v-for="(item ,index)  in selfGuigeList" :key="index"  style="display: inline-block;margin-left: 20px;"  >
                        <el-checkbox  v-model="selectLineWidth[index]"  @change="addSpecification(item)">{{item}}</el-checkbox>
                      </li>
                    </ul>
                    <ul v-show="showSpecification">
                      <li>
                        <el-input v-model="selfGuige" placeholder="请输入自定义规格" style="width: 20%;"></el-input>
                        <el-button type="success" icon="el-icon-check"  circle @click="handleAddguige" ></el-button>
                        <el-button type="danger" icon="el-icon-delete"  circle  @click="handleAddguigeShow"  ></el-button>
                      </li>
                    </ul>
                    <span v-show="showAddSpecification" style="font-size:16px;color:rgba(0,99,255,1);cursor: pointer;" @click="addSpecificationBtn">+添加自定义项</span>
                  </div>
                </div>
                <div class="theWater">
                  <div class="theWaterHade">
                    油墨颜色
                    <span style="font-size:14px;color:rgba(153,153,153,1);">最多支持200个选项</span>
                    <ul>
                      <li style="display: inline-block;margin-left: 20px;">                       
                          <el-checkbox v-model="selectInkColour[index]"  v-for="(item ,index) in selfYanseList"   :key="index" @change="addColour(item)">
                            {{item}}
                          </el-checkbox>                      
                      </li>
                    </ul>
                    <ul v-show="showAddInput">
                      <li>
                        <el-input v-model="selfYanse" placeholder="请输入自定义颜色" style="width: 20%;"></el-input>
                        <el-button  type="success" icon="el-icon-check" circle  @click="handleAddyanse" ></el-button>
                        <el-button  type="danger"  icon="el-icon-delete"  circle  @click="handleAddyanseShow" ></el-button>
                      </li>
                    </ul>
                    <span v-show="showAddColourBtn" style="font-size:16px;color:rgba(0,99,255,1);cursor: pointer;" @click="addColourBtn">+添加自定义项</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 产品销售信息 -->
        <div class="trade-title">
          <h2 style="display: inline-block;">产品销售信息</h2>
          <span style="font-size: 14px;float: right; margin-top: 7px;margin-right: 30px;" >
            设置一件起批可能导致零售买家下单，为避免不必要的纠纷，请慎重操作。
          </span>
        </div>
        <div
          class="trade-box"
          style="border-bottom: 15px solid rgb(240, 240, 240);padding-bottom: 30px;"
        >
          <div class="trade-content">
            <ul>
              <li>
                <span style="width: 40%;">
                  <span style="width: 100%;position:relative;">
                    <span class="shaspan">在线下单</span>
                     <el-radio-group v-model="goods.on_line_order">
                     <el-radio :label="item.value"  v-for="(item,index) in onLineOrderList" :key="index">{{item.name}}</el-radio>               
                   </el-radio-group>                 
                  </span>
                  <!-- <i style="color:#FF6262;padding-left:10px;">*</i> -->
                </span>
              </li>
              <li style="margin: 20px 0;">
                <span style="width: 40%;">
                  <span style="width: 100%;position:relative;">
                    <span class="shaspan">供货方式</span>   
                    <el-radio-group v-model="goods.supply_type">
                     <el-radio :label="item.value"  v-for="(item,index) in supplyWayList" :key="index">{{item.name}}</el-radio>               
                   </el-radio-group>                                  
                  </span>
                  <!-- <i style="color:#FF6262;padding-left:10px;">*</i> -->
                </span>
              </li>
              <li >
                <span style="width: 40%;">
                  <span style="width: 329px;position:relative;">
                    <span class="shaspan">计量单位</span>

                    <el-select v-model="pen.metering_unit" placeholder="请选择" style="width: 214px;" v-if="oneStair == '成品笔'">
                      <el-option
                        v-for="item in  measureunit"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>

                    <el-select v-model="cartridge.metering_unit" placeholder="请选择" style="width: 214px;" v-if="oneStair == '笔芯'">
                      <el-option
                        v-for="item in  cartridgeMeasureunit"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>

                    <el-select v-model="parts.metering_unit" placeholder="请选择" style="width: 214px;" v-if="oneStair == '零部件'">
                      <el-option
                        v-for="item in  partsList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>

                    <el-select v-model="mechanical.metering_unit" placeholder="请选择" style="width: 214px;" v-if="oneStair == '机械设备'">
                      <el-option
                        v-for="item in  mechanicalUnit"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>

                    <el-select v-model="accessory.metering_unit" placeholder="请选择"  v-if="oneStair == '配套加工'">
                      <el-option
                        v-for="item in  accessoryProcessingUnit"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>

                  </span>
                  <!-- <i style="color:#FF6262;padding-left:10px;">*</i> -->
                </span>
              </li>
            

              <li style="position: relative; " class="priceZone">
                <div class="market">
                  <el-radio-group v-model="pen.portion_price" v-if="oneStair == '成品笔'">
                    <el-radio :label="item" v-for="(item,index) in typePriceList" :key="index">{{item}}</el-radio>               
                  </el-radio-group>
                  <div style="margin-top: 30px;" class="radio-group">
                    <el-radio-group v-model="goods.selects">
                      <el-radio label="阶梯价格" @change="ladder()">阶梯价格</el-radio>
                      <div style="position: relative;">
                        <table id="tableladder">
                          <tr>
                            <th style="width: 15%;">档位</th>
                            <th style="width: 27%;">起始数量</th>
                            <th style="width: 27%;">结束数量</th>
                            <th style="width: 27%;">单价</th>
                          </tr>
                          <tr v-for="(item,index) in prices" :key="index">
                            <th style="width: 15%;">{{index+1}}档</th>
                            <th style="width: 27%;background-color: white;">
                              <input v-model="item.start" placeholder="请输入起始数量" :disabled="ladders" type="number" v-fixnumber />
                            </th>
                            <th style="width: 27%;background-color: white;">
                              <input type="number" style="margin-left:8px;"  v-model="item.end"  placeholder="请输入结束数量"  :disabled="ladders" v-fixnumber />
                            </th>
                            <th style="width: 27%;background-color: white;">
                              <input  type="number"  v-model="item.price"  placeholder="请输入单价" :disabled="ladders" v-enter-number2  @blur.prevent="changeCount()"/>
                            </th>
                          </tr>
                        </table>
                        <p v-show="updianShow" class="gears">
                          <span @click="addPriceSection">+添加自定义档位</span>
                        </p>                      
                        <div class="btn-box">
                          <!-- <i value="+" class="addsBtn" @click="add" v-show="updianShow">+</i> -->
                          <i value="-" class="addsBtn" @click="reduce" v-show="reduceShow">-</i>
                        </div>
                      </div>
                      <div style="margin-top: 80px;">
                        <el-radio label="一口价" style @change="onePrices()">一口价</el-radio>
                        <span>
                          <input  placeholder="请输入一口价" type="number" style="width:214px;height: 40px;line-height: 40px;border-radius: 4px;border-color: #666666 !important;border: 1px solid #DCDFE6;padding: 0 15px;color: #606266;font-size: 14px;"
                            :disabled="onePrice" v-model="onePriceNum" v-enter-number2  @blur.prevent="changeOnePriceNumCount()"/> &nbsp;&nbsp; 元
                        </span>
                      </div>
                    </el-radio-group>
                  </div>
                </div>
              </li>
              <li v-if="oneStair == '成品笔' || oneStair == '笔芯'">
                <span style="width: 40%;">
                  <span style="width: 329px;position:relative;">
                    <span class="shaspan">建议零售价</span>
                    <span>
                      <el-input placeholder="请输入零售价" v-model="goods.retail_price" type="number" style="width: 214px;" ></el-input>&nbsp;&nbsp; 元
                    </span>
                  </span>
                  <!-- <i style="color:#FF6262;padding-left:10px;">*</i> -->
                </span>
              </li>

              <!-- <li class="clearfix">
                <span style="float:left">轮播主图：</span>
                <i>注：只能上传jpg/png文件，且不超过2MB,最多5张！</i>
                <div class="upfile-box">
                  <div
                    class="up-file"
                    v-for="(item,index) in imgs"
                    :key="index"
                    style="margin-left:4px"
                  >
                    <img
                      :src="addImg"
                      alt
                      @click="onPickFile1(index)"
                      v-if="!item.img"
                      style="widht:60px;cursor: pointer;"
                    />
                    <div class="banner-img" v-else>
                      <img :src="item.img" style="width:80px;height:80px" />
                      <img :src="removeImg" class="remove" @click="offImg(index)" />
                      <i class="remove iconfont icon-delete_light" @click="offImg(index)"></i>
                      <input
                        type="text"
                        placeholder="请输入关键词"
                        v-model="inputkey[index]"
                        style="position: absolute;top: 82px;width: 80px;height: 22px;"
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      style="display: none"
                      :id="'lfile'+index"
                      @change="imgUpload($event,index)"
                    />
                  </div>
                </div>
                <i style="color:#FF6262;padding-left:10px;">*</i>
                <span @click="aaa()">aaa</span>
              </li>
              <li>
                <span style="float: left;">商品简介:</span>
                <div class="textarea_a">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="goods.product_introduction"
                    maxlength="150"
                    show-word-limit
                  ></el-input>
                </div>
              </li>-->
            </ul>
          </div>
        </div>

        <!-- 商品详情说明 -->
        <div class="trade-title">
          <h2 style="display: inline-block;">商品详情说明</h2>
          <span style="font-size: 14px;margin-left: 10px;color:#FC9263;">图片文案避免字体侵权</span>
          <span style="font-size: 14px;color:#0077FF;">查看规范和优质范例</span>
        </div>
        <div class="editor">
          <div>
            <quill-editor
              v-model="goods.introduce"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </div>
        </div>
        <div class="bottombtn-box">
          <span style="font-size:16px;color:rgba(153,153,153,1);margin-right: 100px;">
            点击阅读
            <span>
              <a href="http://www.bhnc114.com/rules" target="_blank" style="color:#0063FF;cursor: pointer;">《笔海弄潮平台总则》</a>
            </span>
          </span>
          <input
            type="button"
            value="同意协议条款，我要发布"
            @click="submitGoods()"
            class="postCancleBtn"
            v-if="rSave"
            style="background:#FC9263"
          />
          <!-- <input type="button" value="保存" class="postCancleBtn" v-else style="background:#FC9263" /> -->
          <input type="button" value="取消" class="postSaveBtn" @click="$router.go(-1)" />
          <!-- <span style="font-size:16px;color:#0063FF;cursor: pointer;" @click="preview()">预览</span>
          <span
            style="font-size:16px;color:#0063FF;margin-left: 50px;cursor: pointer;"
            @click="savedrafe()"
          >存为草稿</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
                            
<script>
//import x from ''
import addImg from "../../assets/img/add.png";
import bannerImg from "@/views/commodity/bannerImg";
import { addQuillTitle } from "../../assets/js/quill-title.js";

import { quillEditor } from "vue-quill-editor";
import { quillRedefine } from "vue-quill-editor-upload";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import url from "@/serverAPI.config.js";
import { log } from "util";
import { parse } from 'path';
export default {
  data() {
    return {
      ladders: false,
      onePrice: true,
      radio: 3,
      oneStair: "成品笔",
      inputkey: [],
           
      input: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value1: "",    
      //supply_type: "",
      rSave: true,
      type: "0",
      typeList: [
        { value: "0", text: "成品笔" },
        { value: "1", text: "笔配件" },
        { value: "2", text: "笔芯" }
      ],
      measureunit: [
        { value: "支", text: "支" },
        { value: "盒", text: "盒" },
         {value:"件", text:"件"},
         {value:"套", text:"套"},
         {value:"卡", text:"卡"},
          {value:"萝", text:"萝"},
           {value:"板", text:"板"}
      ],
      cartridgeMeasureunit:[
        { value: "支", text: "支" },
        { value: "盒", text: "盒" },
         {value:"包", text:"包"},
         {value:"捆", text:"捆"},
         {value:"箱", text:"箱"},
          {value:"件", text:"件"}         
      ],

      partsList:[
        { value: "个", text: "个" },
        { value: "片", text: "片" },
         {value:"根", text:"根"},
         {value:"块", text:"块"},
         {value:"公斤", text:"公斤"},
          {value:"副", text:"副"},  
          {value:"件", text:"件"}         
      ],

       mechanicalUnit:[
        { value: "台", text: "台" },
        { value: "套", text: "套" },          
      ],

       accessoryProcessingUnit:[
        { value: "公斤", text: "公斤" },
        { value: "次", text: "次" }, 
        { value: "支", text: "支" },
        { value: "根", text: "根" },
        { value: "卷", text: "卷" },
        { value: "套", text: "套" }        
      ],

      id: "",
      clear: true,
      showImg: true,
      addImg: require("../../assets/img/adds.png"),
      removeImg: require("../../assets/img/remove.png"),
      prices: [{}],
      //   款号减号按钮显示
      reduceShow: false,
      reduceStyleShow: false,
      //分类
      options: [],
      count: 0,
      //款号
      skus: [{ sku_img: "" }],
      editorOption: {},
      
     // imgs: [{ img: "" }],
      pattern: "",
      clickSelectChange: false,
      value: [],
      //   商品分类数据模拟
      optiones: [
        {
          value: "zhinan",
          label: "指南",
          children: []
        }
      ],
      //   是否进口
      isExport: [{ value: "1", label: "是" }, { value: "0", label: "否" }],
      isExported: "",
      //是否加工定制
      isCustomized: [{ value: "1", label: "是" }, { value: "0", label: "否" }],
      //是否可擦
      isErasable: [{ value: "1", label: "是" }, { value: "0", label: "否" }],
      //是否快干
      isQuickdrying: [{ value: "1", label: "是" }, { value: "0", label: "否" }],
      //是否防水
      isWaterproof: [{ value: "1", label: "是" }, { value: "0", label: "否" }],

      speList: [[{ name: "", value: "", save: false, add: false }]],
      //自定义添加产品认证
      attList: [
        [
          {
            name: [
               {
                value: "选项0",
                label: "请选择"
              },
              {
                value: "选项1",
                label: "TUV莱茵"
              },
              {
                value: "选项2",
                label: "VDE"
              },
              {
                value: "选项3",
                label: "TUV南德"
              },
              {
                value: "选项4",
                label: "SGS-RoHS"
              }
            ],
            value: "",
            save: false,
            add: false
          }
        ]
      ],
      
      supplyType: [true, false],
      supplyTypeSave: [true, false],
      //   型式
      patternList: [
        { value: "andong", name: "按动", id: "pattern0" },
        { value: "chatao", name: "插套", id: "pattern1" },
        { value: "xuandong", name: "旋动", id: "pattern2" },
        { value: "wutao", name: "无套", id: "pattern3" }
      ],
      //  油墨性质列表
      inkNatureList: [
        { name: "水性", id: "inkNature0" },
        { name: "中性", id: "inkNature1" },
        { name: "油墨", id: "inkNature2" }
      ],
      // 贸易属性列表
      tradeAttrList: [
        { name: "内贸", id: "tradeAttr0" },
        { name: "外贸原单", id: "tradeAttr1" },
        { name: "外贸尾单", id: "tradeAttr2" },
        { name: "库存", id: "tradeAttr3" },
        { name: "促销", id: "tradeAttr4" }
      ],
      // 送礼场合列表
      presentList: [
        { name: "广告促销", id: "present0" },
        { name: "商务馈赠", id: "present1" },
        { name: "节日", id: "present2" },
        { name: "乔迁", id: "present3" },
        { name: "生日", id: "present4" },
        { name: "婚庆", id: "present5" },
        { name: "颁奖纪念", id: "present6" },
        { name: "展销会", id: "present7" },
        { name: "周年庆典", id: "present8" },
        { name: "开业典礼", id: "present9" },
        { name: "员工福利", id: "present10" },
        { name: "公关策划", id: "present11" },
        { name: "其他", id: "present12" }
      ],
      // 是否加印Logo
      isPrintList: [
        { value: "1", label: "可以" },
        { value: "0", label: "不可以" }
      ],
      // 笔杆材质
      shellTextureList: [
        { name: "金属", id: "shellTexture0" },
        { name: "塑料", id: "shellTexture1" },
        { name: "竹木", id: "shellTexture2" },
        { name: "硅胶", id: "shellTexture3" },
        { name: "软陶", id: "shellTexture4" },
        { name: "纸制", id: "shellTexture5" },
        { name: "玉器", id: "shellTexture6" },
        { name: "花梨木", id: "shellTexture7" },
        { name: "铜", id: "shellTexture8" },
        { name: "青花瓷", id: "shellTexture9" }
      ],
      // 用途
      isPurpose: [
        { name: "办公、文具", id: "isPurpose0" },
        { name: "广告赠品", id: "isPurpose1" },
        { name: "酒店餐饮", id: "isPurpose2" },
        { name: "其他", id: "isPurpose3" }
      ],
      // 是否跨境货源
      isBorderList: [{ value: "1", label: "是" }, { value: "0", label: "否" }],
      goodsSpeList: [],//成品笔
      cartridgeList:[],//笔芯
      mountingsList:[],//制笔配件
      mechanicalList:[],//机械设备
      processingList:[],//配套加工
      providerTypeList: [],
      providerScopeList: [],
      oneIndex: 0,
      // 自定义规格
      selfGuige: "",
      //自定义规格列表
      selfGuigeList: ["0.3mm","0.35mm","0.38mm","0.4mm","0.5mm","0.7mm","1.0mm"],
      selectLineWidth:[],
      // 自定义颜色
      selfYanse: "",
      //自定义颜色列表
      selfYanseList: ["蓝","黑","红","绿"],
      selectInkColour:[],
      //一口价值清零
      onePriceNum: "",
      updianShow: true,   
      pen:{
        type:{ 
          start_mode:"",
          texture:"",
          function:"",
          ink:"",
          cartridge_replacement:"",
          cartridge_count:"",
          sculpt:"",
          outline:"",
          match_accessories:"",
          technology:"",
          brand:""
        },       
        attribute:{         
          goods_brand:"",
          style_number:"",
          cargo_label:"",
          shell_texture:"",
          barrel_length:"",
          barrel_weight:"",
          packaged_from:"",
          outer_size:"",
          packaged_quantity:"",
          fur_weigth:"",
          is_import:"",
          processing_customization:"",
          start_quantity:"",
          purpose:"",
          present:[],
          custom:[]         
        },            
        line_width:[],
        colour:[],       
        metering_unit:"",
        portion_price: "空杆价",        
      }, 
      cartridge:{
        type:{
            cartridge_ink:"",
            cartridge_pen_point:"",
            cartridge_pipeline:"",
            cartridge_line_width:"",
            cartridge_brand:""
        },
        attribute:{
          goods_brand:"",
          style_number:"",
          cargo_label:"",
          vitta_diameter:"",
          vitta_length:"",
          write_length:"",
          pen_point_texture:"",
          line_width:"",
          expiration_date:"",
          is_import:"",
          packaged_from:"",
          packaged_specification:"",
          suttle:"",
          whether_erasable:"",
          whether_quick_drying:"",
          whether_waterproof:"",
          printing_logo:"",
          processing_customization:"",
          start_quantity:"",
          custom:[]
        },
        line_width:[],
        colour:[],       
        metering_unit:"",
          
      },
      parts:{
         type:{
            parts:"",
            cartridge_mountings:"",
            packaging:"",
            raw_material:""
        },
        attribute:{
          goods_brand:"",
          style_number:"",        
          texture:"",         
          packaged_from:"",
          product_usage:"",
          printing_logo:""
        },
        metering_unit:""
      },
     
      mechanical:{
         type:{
            mechanical:""
        },
        attribute:{        
          style_number:"",
          cargo_label:"",        
          texture:"",
          boundary_size:"",         
          weight:"",
          goods_brand:"",
          power:"",
          transmittability:"",
          transmission_distance:"",
          function_use:"",
          free_maintenance:"",
          service_life:"",
          custom:[]
        },
        metering_unit:""
      },
    accessory:{
         type:{
             surface_treatment:"",
             printing_technology:"",
             mould_process:""
        },
        attribute:{        
          process_form:"",
          main_process_equipment:"",        
          process_equipment_quantity:"",
          sunup_cargo:"",         
          year_max_process:"",
          process_material:"",
          process_type:"",        
          custom:[]
        },
        metering_unit:""
      },
      goods: {
        p_id:localStorage.getItem('ID'),
        public_products: "1", 
        title:"", 
        imgs:[], 
        img_antistop:"",
        img_describe:"",
        product_certification:[{name:"",value:""}],
        on_line_order:"0",
        supply_type:"0",
        selects: "阶梯价格",
        retail_price:"",
        introduce:"",
      },
      goodsType:"",
      showType:"成品笔 >",
      showSpecification:false,
      showAddSpecification:true,
      showAddInput:false,
      showAddColourBtn:true,   
      typePriceList:["空杆价","含芯价","全含价","空含价"],
      supplyWayList:[{"name":"现货","value":"0"},{"name":"按订单生产","value":"1"}],
      onLineOrderList:[{"name":"支持","value":"1"},{"name":"不支持","value":"0"}],
    };
  },
  components: {
    addImg,
    bannerImg
  },
  component: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  computed: {},
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
    this.str = this.escapeStringHTML(content);

    this.getScope();
    this.getGoodsSpe();
    this.getCartridge();
    this.getMountings();
    this.getProcessing();
    this.getMechanical();
    // this.$nextTick(function() {
    //   setInterval(this.getCount, 10);
    // });
  },
  created() {
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: url.uploadFWB,
        res: respnse => {
          if (respnse.message) {
            this.$message.error(respnse.message);
            return "";
          }
          return respnse.url;
        },
        name: "file", // 图片上传参数名,
        size: 1024 * 2
      },
      placeholder: "请填写商品描述"
    });
  },
  methods: {
    clearData(){
      this.ladders = false,
      this.onePrice = true,
    this.pen={
        type:{ 
          start_mode:"",
          texture:"",
          function:"",
          ink:"",
          cartridge_replacement:"",
          cartridge_count:"",
          sculpt:"",
          outline:"",
          match_accessories:"",
          technology:"",
          brand:""
        },     
        attribute:{         
          goods_brand:"",
          style_number:"",
          cargo_label:"",
          shell_texture:"",
          barrel_length:"",
          barrel_weight:"",
          packaged_from:"",
          outer_size:"",
          packaged_quantity:"",
          fur_weigth:"",
          is_import:"",
          processing_customization:"",
          start_quantity:"",
          purpose:"",
          present:[],
          custom:[]         
        },             
        line_width:[],
        colour:[],       
        metering_unit:"",
        portion_price: "空杆价",         
      };


      this.cartridge={
        type:{
            cartridge_ink:"",
            cartridge_pen_point:"",
            cartridge_pipeline:"",
            cartridge_line_width:"",
            cartridge_brand:""
        },
        attribute:{
          goods_brand:"",
          style_number:"",
          cargo_label:"",
          vitta_diameter:"",
          vitta_length:"",
          write_length:"",
          pen_point_texture:"",
          line_width:"",
          expiration_date:"",
          is_import:"",
          packaged_from:"",
          packaged_specification:"",
          suttle:"",
          whether_erasable:"",
          whether_quick_drying:"",
          whether_waterproof:"",
          printing_logo:"",
          processing_customization:"",
          start_quantity:"",
          custom:[]
        },
        line_width:[],
        colour:[],       
        metering_unit:"",
        
      };

      this.parts={
         type:{
            parts:"",
            cartridge_mountings:"",
            packaging:"",
            raw_material:""
        },
        attribute:{
          goods_brand:"",
          style_number:"",        
          texture:"",         
          packaged_from:"",
          product_usage:"",
          printing_logo:"",
          custom:[]
        },
        metering_unit:""
      };
      this.mechanical={
         type:{
            mechanical:""
        },
        attribute:{        
          style_number:"",
          cargo_label:"",        
          texture:"",
          boundary_size:"",         
          weight:"",
          goods_brand:"",
          power:"",
          transmittability:"",
          transmission_distance:"",
          function_use:"",
          free_maintenance:"",
          service_life:"",
          custom:[]
        },
        metering_unit:""
      };
    this.accessory={
         type:{
             surface_treatment:"",
             printing_technology:"",
             mould_process:""
        },
        attribute:{        
          process_form:"",
          main_process_equipment:"",        
          process_equipment_quantity:"",
          sunup_cargo:"",         
          year_max_process:"",
          process_material:"",
          process_type:"",        
          custom:[]
        },
        metering_unit:""
      };

      this.goods= {
        p_id:localStorage.getItem('ID'),
        public_products: "1", 
        title:"", 
        imgs:[], 
        img_antistop:"",
        img_describe:"",
        product_certification:[{name:"",value:""}],
        on_line_order:"0",
        supply_type:"0",
        selects: "阶梯价格",
        retail_price:"",
        introduce:""
      };
     this.speList=[[{ name: "", value: "", save: false, add: false }]];
     for (let index = 0; index < this.selectLineWidth.length; index++) {
      this.selectLineWidth[index]=false;    
     }
      for (let index = 0; index < this.selectInkColour.length; index++) {
      this.selectInkColour[index]=false;    
     }
     this.onePriceNum="";
    this.prices = [{}];
    },
   addSpecificationBtn(){
     this.showSpecification=true;
     this.showAddSpecification=false;
   },
    //阶梯价格切换
    ladder() {
      this.onePrice = true;
      this.onePriceNum = "";
      this.ladders = false;
      this.updianShow = true;
      this.goods.retail_price="";
    },
    //一口价切换
    onePrices() {
      this.onePrice = false;
      this.prices = [{}];
      this.ladders = true;
      this.updianShow = false;
      this.reduceShow = false;
      this.goods.retail_price="";
    },
    changeCount:function(){   
      if(this.prices.length>0){       
        this.calculateCount();
      }
    },
    changeOnePriceNumCount:function(){   
      if(this.onePriceNum){       
       this.goods.retail_price=(this.onePriceNum*5).toFixed(2);
      }
    },
     calculateCount(){
       let max = this.prices[0].price;
        for(let i = 1,ilen = this.prices.length; i < ilen; i++) {
          if(this.prices[i].price > max) {
            max = this.prices[i].price;
          }
        }
       this.goods.retail_price=(max*5).toFixed(2);
    },
    //切换价格区间和一口价
    // selectVal(ele) {
    //  
    //   this.selected = ele.target.value;
    //   if (this.selected == "一口价") {
    //    
    //     this.qujian = false;
    //     this.yikoujia = true;
    //   } else if (this.selected == "价格区间") {
    //     
    //     this.qujian = true;
    //     this.yikoujia = false;
    //   }
    // },
    //删除规格列表
    handleAddguigeShow() {
       this.showAddSpecification=true;
        this.showSpecification=false;
    },
    // 确认添加自定义规格
    handleAddguige() {
      if (!this.selfGuige) {
        if( this.selfGuigeList.length==40){
          return  this.$message("产品规格最多支持40个选项");
        }
        if (document.querySelectorAll(".el-message").length == 0) {
          return this.$message("请输入内容");
        }
      
      }    
      this.selfGuigeList.push(this.selfGuige);
      this.selfGuige = "";
      this.showSpecification=false;
      this.showAddSpecification=true;
    },
    addSpecification(value){      
        let is=true;
          for (let index = 0; index < this.pen.line_width.length; index++) {
              if(value==this.pen.line_width[index]){
                  this.pen.line_width.splice(index,1);
                  is=false;
              }        
          }
           for (let index = 0; index < this.cartridge.line_width.length; index++) {
              if(value==this.cartridge.line_width[index]){
                  this.cartridge.line_width.splice(index,1);
                  is=false;
              }        
          }
         
      if(is){
        this.pen.line_width.push(value);
        this.cartridge.line_width.push(value);
      }   
    },
    addColour(value){
        let is=true;
          for (let index = 0; index < this.pen.colour.length; index++) {
              if(value==this.pen.colour[index]){
                  this.pen.colour.splice(index,1);
                  is=false;
              }        
          }
            for (let index = 0; index < this.cartridge.colour.length; index++) {
              if(value==this.cartridge.colour[index]){
                  this.cartridge.colour.splice(index,1);
                  is=false;
              }        
          }
      if(is){
        this.pen.colour.push(value);
         this.cartridge.colour.push(value);
      }    
    },
    addColourBtn(){
       this.showAddColourBtn=false;
        this.showAddInput=true;
    },
    //删除颜色列表
    handleAddyanseShow() {   
      this.showAddColourBtn=true;
        this.showAddInput=false;  
    },
    // 确认添加自定义颜色
    handleAddyanse() {
      if (!this.selfYanse) {
        if( this.selfYanseList.length==200){
          return  this.$message("颜色最多支持200个");
        }
        if (document.querySelectorAll(".el-message").length == 0) {
          this.$message("请输入内容");
        }
        return;
      }
      this.selfYanseList.push(this.selfYanse);
      this.selfYanse = "";
      this.showAddColourBtn=true;
      this.showAddInput=false;
    },
    clickSelect(widthValue) {
      this.clickSelectChange = !this.clickSelectChange;
      if (!this.clickSelectChange) {
        return;
      }
      var index =
        document.getElementsByClassName("el-select-dropdown el-popper").length -  1;
      var left = "" + document.getElementsByClassName("el-select-dropdown el-popper")[index] .style.left; 
      left = left.substring(0, left.length - 2);
      document.getElementsByClassName("el-select-dropdown el-popper")[index].style.width = widthValue + "px";
      left = parseInt(left) - (widthValue - 46) + "px";
      setTimeout(() => {
        document.getElementsByClassName("el-select-dropdown el-popper")[index].style.left = left;
      }, 20);
    },
    
    remove() {
      this.clear = true;
    },
    //用图片代替file上传
    onPickFile1(index) {
      document.querySelector(`#lfile${index}`).click();
    },
    onPickFile2(index) {
      document.querySelector(`#file${index}`).click();
    },
    getCount() {
      this.goods.total_inventory = 0;
      this.skus.map(item => {
        if (item.inventory) {
          this.goods.total_inventory += parseInt(item.inventory);
        }
      });
    },
    //款号增加
    addStyle() {
      this.skus.push({ sku_img: "" });
      if (this.skus.length >= 2) {
        this.reduceStyleShow = true;
      }
    },

    // 删除款号行
    reduceStyle() {
      if (this.skus.length > 1) {
        this.skus.splice(this.skus.length - 1);
      }
      if (this.skus.length < 2) {
        this.reduceStyleShow = false;
      }
    },

    //增加区间价格
    addPriceSection() { 
      
      for (let index = 0; index < this.prices.length; index++) {
       if(!this.prices[index].end){
          return this.$message.error("请完善阶梯价格");
       }
        if(!this.prices[index].price){
          return this.$message.error("请完善阶梯价格");
       }
        if(!this.prices[index].start){
          return this.$message.error("请完善阶梯价格");
        }
        
      }

     //this.prices.push({ isPack: "0", taxInclusive: "0" });
     this.prices.push({});
      if (this.prices.length >= 2) {
        this.reduceShow = true;
      }   
    },
    // 减少区间价格
    reduce() {
      if (this.prices.length > 1) {
        this.prices.length == 1;
        this.prices.splice(this.prices.length - 1);
      }
      if (this.prices.length < 2) {
        this.reduceShow = false;
      }
      this.calculateCount();
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    },
    //获取经营范围
    getScope() {
      this.$http({
        url: `${url.scope}`,
        method: "get"
      })
        .then(res => {
          this.options = res.data.data;
          this.optiones = [];
          this.options.map(item => {
            this.optiones.push({
              value: item.name,
              label: item.name
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    //获取成品笔分类
    getGoodsSpe() {
      this.$http({
        url: `${url.GoodsSpecification}`,
        method: "get"
      }).then(res => {  
        if (res.data.code == 20000) {
          this.goodsSpeList = res.data.data;                           
        }
      });
    },
      //获取笔芯分类
    getCartridge() {
      this.$http({
        url: `${url.findGoodsCartridgeSpecification}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.cartridgeList = res.data.data;                       
        }
      });
    },
    //获取制笔配件
    getMountings() {  
      this.$http({
        url: `${url.findAllMountings}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.mountingsList = res.data.data; 
                          
        }
      });
    },
      //获取机械设备
    getMechanical() {  
      this.$http({
         url: `${url.findAllMechanical}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.mechanicalList = res.data.data;                                
        }
      });
    },
    //获取制笔行业配套加工
    getProcessing() {          
      this.$http({
         url: `${url.findAllProcessing}`,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.processingList = res.data.data;                                             
        }
      });
    },


    //存为草稿
    savedrafe() {
      
    },
    //预览
    preview() {
      
    },
  changeHandler(value){  
    this.updianShow = true;
    this.changeHandlerType();
    this.clearData();        
  },
  changeHandlerType(){ 
    let datas=[];
     if (this.oneStair=="成品笔") {      
        let index=0;
        this.showType=this.oneStair+" > ";
        for (var item in this.pen.type){
            if(this.pen.type[item]){
                let data="("+this.goodsSpeList[index].name+" > "+this.pen.type[item]+")";  
                datas.push(data);            
            } 
        index++;
        }        
      }
      if (this.oneStair=="笔芯") {              
        let index=0;
        this.showType=this.oneStair+" > ";
        for (var item in this.cartridge.type){
            if(this.cartridge.type[item]){
                let data="("+this.cartridgeList[index].name+" > "+this.cartridge.type[item]+")";  
                datas.push(data);            
            } 
        index++;
        }      
      }
       if (this.oneStair=="零部件") {              
        let index=0;
        this.showType=this.oneStair+" > ";
        for (var item in this.parts.type){
            if(this.parts.type[item]){
                let data="("+this.mountingsList[index].name+" > "+this.parts.type[item]+")";  
                datas.push(data);            
            } 
        index++;
        }      
      }
        if (this.oneStair=="机械设备") {                  
        let index=0;
        this.showType=this.oneStair+" > ";
        for (var item in this.mechanical.type){
            if(this.mechanical.type[item]){
                let data="( 机械设备 > "+this.mechanical.type[item]+")";  
                datas.push(data);            
            } 
        index++;
        }      
      }
        if (this.oneStair=="配套加工") {              
        let index=0;
        this.showType=this.oneStair+" > ";
        for (var item in this.accessory.type){
            if(this.accessory.type[item]){
                let data="("+this.processingList[index].name+" > "+this.accessory.type[item]+")";  
                datas.push(data);            
            } 
        index++;
        }      
      }
    this.showHandler(datas);
    datas=[];

  },
  showHandler(datas){
        if(datas.length>0){
          this.showType=this.showType+"["+datas.toString()+"]";
          this.showType= this.showType.replace(/,/g,", ");       
        }
  },

    //提交
    submitGoods() {     
      var custom = [];
        this.speList.map(item => {
          if (item[0]) {
            custom.push(item[0]);
          }
          if (item[1]) {
            custom.push(item[1]);
          }
        });
        this.goods.custom = JSON.stringify(custom);

      if(this.oneStair=="成品笔"){
        this.pen.attribute.custom=custom;    
         let index=0;
         for (var item in this.pen.type){          
          if(!this.pen.type[item]){
            if(item!="brand"){
             return this.$message("请选择' "+this.goodsSpeList[index].name+" '分类");               
            }
             
          } 
          this.goods[item]= this.pen.type[item];            
          index++;    
        }
        this.goods.goods_type=JSON.stringify(this.pen.type);
        this.goods.goods_attribute=JSON.stringify(this.pen.attribute);
        this.goods.start_quantity=this.pen.attribute.start_quantity;
        this.goods.line_width=JSON.stringify(this.pen.line_width);
        this.goods.ink_colour=JSON.stringify(this.pen.colour);
        this.goods.present=JSON.stringify(this.pen.attribute.present);
        this.goods.style_number=this.pen.attribute.style_number;
        this.goods.metering_unit=this.pen.metering_unit;
        this.goods.portion_price=this.pen.portion_price;
        this.goods.type="0";   
      } 
       if(this.oneStair=="笔芯"){
         this.cartridge.attribute.custom=custom;
         let index=0;
         for (var item in this.cartridge.type){
          if(!this.cartridge.type[item]){
            if(item!="cartridge_brand"){
                return this.$message("请选择"+this.cartridgeList[index].name+"分类"); 
            }        
          }           
          index++;    
        }
        this.goods.goods_type=JSON.stringify(this.cartridge.type);
        this.goods.goods_attribute=JSON.stringify(this.cartridge.attribute);
        this.goods.start_quantity=this.cartridge.attribute.start_quantity;
        this.goods.line_width=JSON.stringify(this.cartridge.line_width);
        this.goods.ink_colour=JSON.stringify(this.cartridge.colour);
        this.goods.style_number=this.cartridge.attribute.style_number;
        this.goods.metering_unit=this.cartridge.metering_unit;      
        this.goods.type="1";   
      }

       if(this.oneStair=="零部件"){
         this.parts.attribute.custom=custom;
         let index=0;
         for (var item in this.parts.type){
          if(!this.parts.type[item]){
             return this.$message("请选择"+this.mountingsList[index].name+"分类"); 
          }           
          index++;    
        }
        this.goods.goods_type=JSON.stringify(this.parts.type);
        this.goods.goods_attribute=JSON.stringify(this.parts.attribute);  
        this.goods.style_number=this.parts.attribute.style_number;
        this.goods.metering_unit=this.parts.metering_unit;    
        this.goods.type="2";   
      }
    
       if(this.oneStair=="机械设备"){
         this.mechanical.attribute.custom=custom;
         let index=0;
         for (var item in this.mechanical.type){
          if(!this.mechanical.type[item]){
             return this.$message("请选择 机械设备 分类"); 
          }           
          index++;    
        }
        this.goods.goods_type=JSON.stringify(this.mechanical.type);
        this.goods.goods_attribute=JSON.stringify(this.mechanical.attribute);    
        this.goods.style_number=this.mechanical.attribute.style_number;
        this.goods.metering_unit=this.mechanical.metering_unit;    
        this.goods.type="3";   
      }
      if(this.oneStair=="配套加工"){
         this.accessory.attribute.custom=custom;
         let index=0;
         for (var item in this.accessory.type){
          if(!this.accessory.type[item]){
             return this.$message("请选择"+this.processingList[index].name+"分类"); 
          }           
          index++;    
        }
        this.goods.goods_type=JSON.stringify(this.accessory.type);
        this.goods.goods_attribute=JSON.stringify(this.accessory.attribute);    
        this.goods.style_number=this.accessory.attribute.style_number;
        this.goods.metering_unit=this.accessory.metering_unit;    
        this.goods.type="4";   
      }

      if(!this.goods.title){
          return this.$message("请填写标题"); 
        }
        
        if(!this.goods.imgs.length>0){
           return this.$message("最少上传一张主图"); 
        }
        this.goods.img = JSON.stringify(this.goods.imgs);

        var product_certifications=[];
        for (let index = 0; index < this.goods.product_certification.length; index++) {          
          if(this.goods.product_certification[index].name!="" && this.goods.product_certification[index].name!='请选择'){              
              if(this.goods.product_certification[index].value){
                var product_certification={};
                product_certification.name=this.goods.product_certification[index].name;
                product_certification.value=this.goods.product_certification[index].value;
                 product_certifications.push(product_certification);
             }else{
                return this.$message("请完善产品认证"); 
             }
          }else if(this.goods.product_certification[index].name=="" || this.goods.product_certification[index].name=='请选择'){
              if(this.goods.product_certification[index].value){
                 return this.$message("请完善产品认证"); 
             }         
          }              
        }
        
        this.goods.product_certifications=JSON.stringify(product_certifications);              
        if(this.goods.selects=="阶梯价格"){
           var price_range=[];
            for (let index = 0; index < this.prices.length; index++) {
          
              if(this.prices[index].end && this.prices[index].price && this.prices[index].start){
                if(Number(this.prices[index].start)>Number(this.prices[index].end)){
                   return this.$message("阶梯价格开始数量不能大于结束数量"); 
                }
               var price={};
               price.start=Number(this.prices[index].start);
               price.end=Number(this.prices[index].end);
               price.price=Number(this.prices[index].price);
               price_range.push(price);
              }else if(!this.prices[index].end && !this.prices[index].price && !this.prices[index].start){
                  break;
              }else{
                    return this.$message.error("请完善阶梯价格");
              }                      
            }
            this.goods.price_range=JSON.stringify(price_range);
        }else{
          this.goods.price_range="[]";
          if(this.onePriceNum){
            this.goods.one_price=this.onePriceNum;
          }else{
            return this.$message("请填写一口价"); 
          }       
        }      
        
        this.goods.now=new Date();
        this.goods.status = "0";
        this.goods.sku = "[]";
        this.goods.scope = "[]"; 
      this.$http({
         url: `${url.Goods}`,
        //url: `http://172.16.0.138:9009/goods`,
        method: "post",
        data: this.goods
      }).then(res => {
          if (res.data.code == 20000) {      
            this.rSave = true;
            this.$router.push({ path: "/commodity", query: { isShow: true } });         
           sessionStorage.setItem("isShow", true);
          }
        
         this.rSave = true;
        }).catch(err => {
          this.goods.scope = JSON.parse(this.goods.scope);
          this.rSave = true;
        });
    },

    //sku
    skuUpload(event, index) {
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        url: `${url.Upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        this.skus[index].sku_img = res.data;
      });
    },
    //关闭图片重新选
    offSku(index) {
      this.skus[index].sku_img = "";
    },
    //img
    imgUpload(event, index) {
      if (event.target.files[0].size > 1024 * 1024 * 2) {
        this.$message.error("图片不能大于2M!");
        return;
      }
      var formData = new FormData();
      formData.append(`file`, event.target.files[0]);
      this.$http({
        //url:'http://172.16.0.138:9010/upload',
        url: `${url.Upload}`,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {   
        // if(this.oneStair=="成品笔"){
        //   this.pen.imgs.push(res.data);
        // } 
           this.goods.imgs.push(res.data);           
      });

    },
    //关闭图片重新选
    offImg(index) {     
      //  if(this.oneStair=="成品笔"){
      //     this.pen.imgs.splice(index,1);
      //   } 
       this.goods.imgs.splice(index,1);
     
    },
    changeType() {
      if (this.type == "1") {
        this.goods.scope = [];
        this.$http({
          url: `${url.scope}/mountingsScope`,
          method: "get"
        })
          .then(res => {
            this.options = res.data.data;
            this.optiones = [];
            this.options.map(item => {
              this.optiones.push({
                value: item.name,
                label: item.name
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (this.type == "2") {
        this.goods.scope = [];
        this.$http({
          url: `${url.scope}/cartridgeScope`,
          method: "get"
        })
          .then(res => {
            this.options = res.data.data;
            this.optiones = [];
            this.options.map(item => {
              this.optiones.push({
                value: item.name,
                label: item.name
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (this.type == "0") {
        this.goods.scope = [];
        this.getScope();
      }
    },
    // 改变级联选择器
    handleChange(value) {},
    saveSpe(index, num) {
      if (!this.speList[index][num].name) {
        this.$message.error("属性值不能为空");
        return;
      }
      this.speList[index][num].save = true;
    },
    addSpe(index, num) {
      this.speList[index][num].add = true;
      if (num == 0) {
        this.speList[index].push({
          name: "",
          value: "",
          save: false,
          add: false
        });
      }
      if (num == 1) {
        this.speList.push([{ name: "", value: "", save: false, add: false }]);
      }
    },
    deleteSpe(index, num) {
      this.speList[index].splice(
        this.speList[index].indexOf(this.speList[index][num]),
        1
      );
      var deleteSpe = [];
      this.speList.map(item => {
        if (item[0]) {
          deleteSpe.push(item[0]);
        }
        if (item[1]) {
          deleteSpe.push(item[1]);
        }
      });
      this.speList = [];
      var length = parseInt(parseFloat(deleteSpe.length / 2) + 0.5);
      for (var i = 1; i <= length; i++) {
        if (deleteSpe[i * 2 - 2]) {
          this.speList.push([]);
          this.speList[i - 1].push(deleteSpe[i * 2 - 2]);
        }
        if (deleteSpe[i * 2 - 1]) {
          this.speList[i - 1].push(deleteSpe[i * 2 - 1]);
        }
      }
    },
    authentication(value,i){
      if(value=="请选择"){
        
      }
     
    },
    //自定义添加产品认证
    addAtt(index) {
      for (let index = 0; index < this.goods.product_certification.length; index++) {
          if(!this.goods.product_certification[index].name || this.goods.product_certification[index].name=="请选择"){
            return  this.$message("请选择当前认证机构");
          }
           if(!this.goods.product_certification[index].value ){
            return  this.$message("请输入当前证书编号");
          }          
      }
      let data={name:"",value:""};
      this.goods.product_certification.push(data);      
    
    },
    deleteAtt(index) {     
      this.goods.product_certification.splice(index-1,1);
    }   
  },
  //   获取商品分类
  getProviderScope() {
    this.$http({
      url: `${url.scope}/providerScope`,
      method: "get"
    }).then(res => {
      if (res.data.code == 20000) {
        var providerScopeList = res.data.data;
        providerScopeList.map(item => {
          var data = [];
          item.providerTwoScopes.map(item2 => {
            data.push({ isSelected: false, name: item2.name });
          });
          this.providerTypeList.push({
            isSelected: false,
            data: data,
            name: item.name
          });
        });
        this.providerScopeList = providerScopeList;
      } else {
        this.$message.error(res.data.message);
      }
    });
  }
};
</script>

<style lang="scss">
$color: #fc9263;
#bhncPostTrade {
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 61%;
    margin: 24px 0;
  }
  .comm {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: $color;
      background: $color;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: $color;
    }
  }
  .comm_a,
  .allStair {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #666666;
      background: #666666;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #666666;
    }
  }
  .trade {
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #666;
      border-color: #666;
      color: #666;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #666;
    }
    .el-checkbox__input.is_focus .el-checkbox__inner {
      border-color: #666;
    }
  }

  .trade .el-select .el-input--suffix {
    width: auto;
  }
  .selectId {
    border: none !important;
    height: 38px !important;
    width: 40px !important;
  }

  .selectId .el-input__inner {
    border: none !important;
  }

  .trade .el-input__inner {
    border-color: #666666 !important;
    /* color:  #666666!important; */
  }
  .prices .el-input .el-input__inner {
    padding: 0;
    text-align: center;
  }

  .trade-content li .el-checkbox__inner {
    width: 15px;
    height: 15px;
    border-color: #666666;
  }

  .trade-content li .el-checkbox__inner::after {
  }

  .trade-content li .el-checkbox__label {
    color: #666666;
  }

  .trade .el-select .el-input--suffix .el-input__inner {
    // width: 214px;
    border: 1px solid #666666;
    height: 40px;
    line-height: 40px;
    /* color: #666666; */
    background: transparent;
    padding-right: 0;
  }

  .selectId .el-input--suffix .el-input__inner {
    font-size: 0 !important;
  }
  .textarea_a {
    display: inline-block;
    width: 80%;
    overflow: hidden;
    .el-textarea {
      position: relative;
      display: inline-block;
      width: 51.5%;
      vertical-align: bottom;
      font-size: 14px;

      textarea {
        resize: none;
        min-height: 188px !important;
        border: 1px solid #666666;
      }
    }
  }
  .radio-group {
    .el-radio-group {
      font-size: unset;
    }
  }
}
</style>


<style lang='scss' scoped>
//@import url()
#bhncPostTrade {
  .trade {
    // background-image: url("../../../static/img/penbg.png");
    // background-repeat: no-repeat;
    // background-position: right bottom;
    // background-attachment: fixed;

    .classifyBox {
      padding-left: 150px;
      align-items: flex-start;

      .theFirstClassify,
      .theSecondClassify {
        border: 1px solid rgba(192, 192, 192, 1);
        border-radius: 6px;
        width: 250px;
        margin-right: 37px;
        background: #fff;
        h3 {
          height: 40px;
          background: rgba(192, 192, 192, 0.29);
          border-radius: 6px 6px 0px 0px;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          border-bottom: 1px solid rgba(192, 192, 192, 1);
        }
        ul {
          li {
            padding-left: 12px;
            .classifyName {
              display: inline-block;
              width: 200px;
              font-size: 14px;
              font-family: MicrosoftYaHei, 微软雅黑;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              padding: 0;
              cursor: pointer;
              text-align: left;
            }
          }
          li:hover {
            background: #f5f5f5;
          }
          // li:hover span {
          //   color: #fff;
          // }
        }
        .theSecondClassify {
          margin-right: 0;
        }
      }

      label {
        display: inline-block;
        position: relative;
        padding-left: 40px;
        cursor: pointer;
        height: 14px;
      }
      label::before {
        display: inline-block;
        position: absolute;
        left: 0;
        content: "";
        width: 14px;
        height: 14px;
        border: 1px solid;
        margin-right: 40px;
      }
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"]:checked + label::before {
        content: "✔";
        text-align: center;
        line-height: 13px;
      }
    }
  }
  .show-img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    object-fit: cover;
    margin: 0 auto;
    position: relative;
    img {
      width: 100%;
    }
    .remove {
      width: 25px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
  }
  .trade-box {
    .trade-title {
      padding: 15px 0;
      padding-left: 60px;
      border-bottom: 1px solid #f0f0f0;
      h2 {
        font-size: 24px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: #666666;
      }
    }
    .trade-content {
      padding-left: 70px;
      padding-top: 20px;
      .el-input {
        width: 622px;
      }
      span {
        // display: inline-block;
        // width: 110px;
        // font-size: 16px;
        // font-family: MicrosoftYaHei, 微软雅黑;
        // font-weight: 400;
        // color: rgba(102, 102, 102, 1);
      }
      i {
        font-size: 12px;
        color: #666666;
      }
      .prices {
        width: 90%;
        // float: right;
        display: flex;
        .el-input {
          width: 80px;
          margin-right: 12px;
          .el-input__inner {
            // padding: 0;
          }
        }
        .unit-price {
          display: flex;
          input[type="checkbox"] {
            width: 15px;
            height: 15px;
            vertical-align: middle;
            margin: 0 5px;
          }
        }
      }
      .upfile-box {
        display: flex;
        .up-file {
          width: 80px;
          height: 100px;
          overflow: hidden;
          object-fit: cover;
          margin: 10px 20px;
          img {
            width: 100%;
          }
          .banner-img {
            position: relative;
            .remove {
              // width: 35px;
              position: absolute;
              bottom: 5px;
              right: 5px;
              cursor: pointer;
              color: red;
              font-size: 14px;
              font-weight: 900;
            }
          }
        }
      }

      .btn-box {
        //   width: 100%;
        position: absolute;
        bottom: 30px;
        left: 740px;
        padding-right: 20px;
        display: flex;
        align-items: right;
        justify-content: flex-end;
        .addsBtn {
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          border: 2px solid #666666;
          border-radius: 50%;
          background: #ffffff;
          color: #666666;
          font-size: 24px;
          font-weight: 800;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .style-number {
        margin-left: 110px;
        margin-top: 25px;
        width: 622px;
        table {
          width: 100%;
          text-align: center;
          border: 1px solid #666666;
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          th {
            text-align: center;
          }
          .el-upload--picture-card {
            width: 60px !important;
            height: 60px;
          }
          .inputStyle {
            width: 100%;
            height: 100%;
            font-size: 16px;
            text-indent: 20px;
          }
        }
        .btn-box {
          margin: 20px 0;
        }
      }
    }
    .editor {
      margin: 20px 0;
      margin-left: 70px;
      height: 500px;
      .editor-title {
        font-size: 16px;
        font-family: MicrosoftYaHei, 微软雅黑;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding-bottom: 30px;
      }
      .quill-editor {
        width: 90%;
        display: inline-block;
        height: 400px;
        .ql-toolbar {
          line-height: 20px;
        }
      }
    }
  }

  label {
    .postCks {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #666666;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 12px;
        height: 12px;
        font-size: 12px;
      }
    }
  }

  .option {
    padding-left: 20px;
  }

  .btn-Box {
    //   width: 100%;
    position: absolute;
    bottom: 20px;
    right: -110px;
    padding-right: 20px;
    display: flex;
    align-items: right;
    justify-content: flex-end;
    .addsBtn {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border: 2px solid #666666;
      border-radius: 50%;
      background: #ffffff;
      color: #666666;
      font-weight: 800;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .bottombtn-box {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    align-items: center;
    border-top: 1px solid #ececec;
    .postSaveBtn {
      width: 88px;
      height: 35px;
      background: rgba(192, 192, 192, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 0 50px;
      cursor: pointer;
    }
    .postCancleBtn {
      width: 250px;
      height: 35px;
      background: #666666;
      border-radius: 4px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-family: MicrosoftYaHei, 微软雅黑;
      font-weight: 400;
      cursor: pointer;
    }
  }

  .divconent {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .show-Img {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .remove {
      position: absolute;
      top: 0;
      right: 5px;
      cursor: pointer;
      color: red !important;
      font-weight: 900;
    }
  }

  .priceZone {
    display: flex;
    flex-wrap: wrap;
    div:nth-child(-n + 2) {
    }
  }
  .trade-box .trade-content .prices {
    padding-left: 110px;
  }

  .rightSpan {
    display: flex;
    width: auto;
  }

  .delBtns {
    text-align: center;
    color: #666666 !important;
    font-size: 26px !important;
    font-weight: 800;
    margin-right: 10px;
    cursor: pointer;
  }

  .theWater {
    width: 60%;
    min-height: 111px;
    background: rgba(246, 246, 246, 1);
    border-radius: 3px;
    margin-left: 110px;
    margin-bottom: 14px;
    padding: 10px;
    .theWaterHade {
      line-height: 30px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .comm {
    margin: 20px 0 20px 40px;
  }
  .comm_a {
    margin: 20px 0 20px 40px;
  }
  .tiele_type {
    .tiele_type_a {
      width: 26px;
      height: 26px;
      background: #fcec89;
      border: 1px solid #fcba9c;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(252, 146, 99, 1);
      margin-right: 10px;
      line-height: 26px;
    }
  }
  .oneStair {
  }
  .allStair {
    background-color: #f9f9f9;
    width: 83%;
    margin: 20px 0;
    .allStair-hade {
      .towStair {
        color: rgb(153, 153, 153);
        border-right: 15px solid white;
        display: inline-block;
        width: 140px;
        padding: 15px 20px 15px 12px;
      }
    }
    .allStair-body {
      width: 100%;
      display: inline-block;
      .erjiStair {
        display: inline-block;
        width: 140px;
        padding: 15px 20px 15px 12px;
        text-align: right;
        float: left;
        font-size: 14px;
      }
      .fuxuan {
        width: 80%;
        line-height: 30px;
        border-left: 15px solid white;
        padding: 15px 0px 10px 15px;
      }
    }
  }
  .title-hadeing {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin: 20px 10px 20px 0;
  }
  .property-name {
    .property-name-li {
      display: inline-block;
      background: rgba(249, 249, 249, 1);
      width: 70%;
      margin-left: 110px;
      margin-bottom: 14px;
      padding: 10px;
      .property-name-fu {
        width: 45%;
        display: inline-block;
        text-align: center;
        margin: 10px 0;
        .property-name-tit {
          display: inline-block;
          width: 35%;
          font-size: 16px;
          font-family: MicrosoftYaHei, 微软雅黑;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          text-align: right;
        }
      }
    }
  }
  .shaspan {
    margin-right: 20px;
    width: 95px;
    text-align: right;
    display: inline-block;
  }
  .market {
    width: 835px;
    min-height: 326px;
    background: rgba(249, 249, 249, 1);
    border-radius: 3px;
    margin: 15px 0 20px 30px;
    padding: 17px;
  }
  #tableladder {
    margin-left: 100px;
    tr {
      width: 650px;
      display: inline-table;
      font-size: 14px;
      th {
        display: inline-block;
        border: 1px solid #cccccc;
        text-align: center;
        height: 36px;
        line-height: 36px;
      }
    }
  }
  .gears {
    text-align: right;
    padding-right: 80px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(0, 99, 255, 1);
    margin-top: 10px;
    span {
      cursor: pointer;
    }
  }
  .ivu-upload {
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
    .ivu-upload-a {
      position: relative;

      .ivu-upload-input {
        opacity: 0;
        position: absolute;
        width: 120px;
        height: 120px;
        cursor: pointer;
        left: 5px;
      }
    }
  }
  .width-input{
    width:43%!important;
  }
}
</style>