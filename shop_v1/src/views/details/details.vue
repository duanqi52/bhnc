<template>
  <div id="bhncDetails">
    <div class="detailSimple" v-if="goods">
      <!-- 内容 -->
      <!-- 商品介绍开始 -->
      <div class="w detailIntroduct clearfix">
        <div class="detailLeft fl">
          <div class="topDetail">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 16px;"></el-breadcrumb>
            <!--产品参数开始-->
            <div style="display: inline-block;float: left;width: 37%;">
              <div id="preview" class="spec-preview">
                <span class="jqzoom">
                  <img :src="masterImg" style="height: 350px;width: 350px;" />
                </span>
              </div>
              <!--缩图开始-->
              <div class="spec-scroll">
                <a class="prev">&lt;</a>
                <a class="next">&gt;</a>
                <div class="items">
                  <ul>
                    <li v-for="(img,index) in goods1.img" :key="index">
                      <img alt="佳能" :src="img" :id="'img'+index" v-if="img" />
                    </li>
                  </ul>
                </div>
              </div>
              <!--缩图结束-->

              <div class="linkToShare clearfix" style="display: inline-block;margin-top: 70px;">
                <div class="shareLike fr" v-if="goods" style="width: 370px;">
                  <i class="iconfont icon-liulanwenjian">
                    <span class="txt">浏览次数（{{goods.browse_count}}）</span>
                  </i>
                  <i class="iconfont icon-jiankongzhanxian">
                    <span class="txt">展现次数（{{goods.show_count}}）</span>
                  </i>
                  <i class="iconfont icon-like" title="点击收藏" v-show="!isC" @click="addCollection()">
                    <span class="txt">收藏商品({{goods.collection_count}})</span>
                  </i>
                  <i
                    class="iconfont icon-likefill"
                    style="color:red;margin-right: 20px;margin-left: 20px;"
                    title="取消收藏"
                    v-show="isC"
                    @click="deleteCollection()"
                  >
                    <span class="txt">取消收藏({{goods.collection_count}})</span>
                  </i>
                </div>
              </div>
            </div>
            <div
              style="display: inline-block;padding-left: 20px;width: 63%;margin: 0;"
              class="selling"
            >
              <h2 class="title_text">{{goods.title}}</h2>
              <p
                style="margin-bottom: 10px;margin-top: 22px;"
                v-if="goods.retail_price!='' && goods.retail_price>0"
              >
                <span class="selling_w">市场建议零售价：</span>
                <span style="color: #D21D27;font-size:14px;">
                  ￥
                  <span style="font-size:20px;">{{goods.retail_price}}</span>
                </span>
              </p>
              <div v-show="weicaigou">
                <p style="margin-bottom: 10px;margin-top: 10px;">
                  <span class="selling_w">出厂价：</span> ( 采购商登录可见 )
                </p>
              </div>
              <!-- 采购商登录可见   -->
              <div class="isVisible" v-show="caigou">
                <!-- <div class="isVisible" > -->
                <div v-show="!weicaigou">
                  <span
                    class="selling_w"
                    v-if="goods.portion_price && goods.one_price"
                  >{{goods.portion_price}}&nbsp;&nbsp;&nbsp;</span>
                  <p style="margin: 10px 0;display: block;" v-if="goods.one_price">
                    <span class="selling_w">一口价：</span>
                    <span style="color: #D21D27;font-size:14px;">
                      ￥
                      <span style="font-size:20px;">{{goods.one_price}}</span>
                    </span>
                  </p>
                  <p v-if="goods.one_price" style="padding-bottom: 10px;">
                    <span class="selling_w" v-if="goods.start_quantity">起订量：</span>
                    <span style="font-size:14px;">{{goods.start_quantity}}</span>
                  </p>
                </div>
                <div style="margin-bottom: 14px;position: relative;" v-if="!goods.one_price">
                  <span
                    class="selling_w"
                    v-if="goods.portion_price && goods.price_range.length > 0  && goods.price_range[0].price != ''"
                    style="position: absolute;top: 10px;font-size: 14px;"
                  >{{goods.portion_price}}：</span>
                  <span
                    class="selling_w"
                    v-if="goods.portion_price !='空杆价' && goods.portion_price !='含芯价' && goods.portion_price !='全含价' && goods.portion_price !='空含价' && goods.portion_price =='' && goods.price_range[0].taxInclusive != '0' && goods.price_range[0].price != ''  "
                    style="position: absolute;top: 10px;font-size: 14px;"
                  >批发价：</span>
                  <span
                    class="selling_w"
                    v-if="JSON.stringify(goods.price_range[0]) != '{}' && JSON.stringify(goods.price_range) !='[]' && goods.price_range[0].taxInclusive != '0' && goods.price_range[0].price != ''"
                    style="font-size: 14px;"
                  >起批量：</span>
                  <ul class="trade" style="margin-left: 6px;" v-if="goods.price_range.length > 0 && goods.price_range[0].taxInclusive != '0' && goods.price_range[0].price != ''">
                    <li
                      class="trade_jia"
                      v-for="(price_range,index) in goods.price_range"
                      :key="index"
                      v-if="index<3"
                      style="min-width: 0;margin-right: 65px;"
                    >
                      <span style="color: #D21D27;font-size:14px;" v-if="index<3">
                        ￥
                        <span style="font-size:20px;">{{price_range.price}}</span>
                      </span>
                      <br />
                      <span
                        v-if="index<3"
                        style="font-size: 14px;"
                      >{{price_range.start}} - {{price_range.end}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="selling"
                style="margin-top: 0px;min-height: 230px;"
                v-if="goods.type=='0'"
              >
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute &&  goods.goods_attribute.goods_brand"
                >
                  <span class="selling_w">品牌：</span>
                  {{goods.goods_attribute.goods_brand}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.style_number">
                  <span class="selling_w">型号：</span>
                  {{goods.style_number}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.cargo_label"
                >
                  <span class="selling_w">货号：</span>
                  {{goods.goods_attribute.cargo_label}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.shell_texture"
                >
                  <span class="selling_w">笔杆材质：</span>
                  {{goods.goods_attribute.shell_texture}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.barrel_length"
                >
                  <span class="selling_w">笔身长度：</span>
                  {{goods.goods_attribute.barrel_length}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.barrel_weight"
                >
                  <span class="selling_w">笔身重量：</span>
                  {{goods.goods_attribute.barrel_weight}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.packaged_from"
                >
                  <span class="selling_w">包装形式：</span>
                  {{goods.goods_attribute.packaged_from}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.outer_size"
                >
                  <span class="selling_w">外箱尺寸：</span>
                  {{goods.goods_attribute.outer_size}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.packaged_quantity"
                >
                  <span class="selling_w">包装数量：</span>
                  {{goods.goods_attribute.packaged_quantity}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.fur_weigth"
                >
                  <span class="selling_w">毛净重：</span>
                  {{goods.goods_attribute.fur_weigth}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.is_import"
                >
                  <span class="selling_w">是否进口：</span>
                  <span v-if="goods.goods_attribute.is_import =='1'">是</span>
                  <span v-if="goods.goods_attribute.is_import =='0'">否</span>
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.processing_customization"
                >
                  <span class="selling_w">加工定制：</span>
                  <span v-if="goods.goods_attribute.processing_customization =='1'">是</span>
                  <span v-if="goods.goods_attribute.processing_customization =='0'">否</span>
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute && goods.goods_attribute.purpose"
                >
                  <span class="selling_w">用途：</span>
                  {{goods.goods_attribute.purpose}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.present.length > 0">
                  <span class="selling_w">送礼场合：</span>
                  <span>{{goods.present.join("、")}}</span>
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.custom"
                  v-for="(custom,index) in goods.custom"
                  :key="index"
                >
                  <span class="selling_w" v-if="custom.name">{{custom.name}}:</span>
                  <span v-if="custom.name">{{custom.value}}</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.line_width.length > 0">
                  <span class="selling_w">线幅：</span>
                  <span class="frBox">{{goods.line_width.join("、")}}</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.ink_colour.length > 0">
                  <span class="selling_w">油墨颜色：</span>
                  <span class="frBox">{{goods.ink_colour.join("、")}}</span>
                </p>
              </div>
              <div
                class="selling"
                style="margin-top: 0px;min-height: 230px;"
                v-if="goods.type=='1'"
              >
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.goods_brand">
                  <span class="selling_w">品牌：</span>
                  {{goods.goods_attribute.goods_brand}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.style_number">
                  <span class="selling_w">型号：</span>
                  {{goods.style_number}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.cargo_label">
                  <span class="selling_w">货号：</span>
                  {{goods.goods_attribute.cargo_label}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.vitta_diameter">
                  <span class="selling_w">油管直径：</span>
                  {{goods.goods_attribute.vitta_diameter}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.vitta_length">
                  <span class="selling_w">油管长度:</span>
                  {{goods.goods_attribute.vitta_length}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.write_length">
                  <span class="selling_w">书写长度:</span>
                  {{goods.goods_attribute.write_length}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.pen_point_texture">
                  <span class="selling_w">笔头材质:</span>
                  {{goods.goods_attribute.pen_point_texture}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.line_width">
                  <span class="selling_w">线幅:</span>
                  {{goods.goods_attribute.line_width}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.expiration_date">
                  <span class="selling_w">保质期:</span>
                  {{goods.goods_attribute.expiration_date}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.is_import">
                  <span class="selling_w">是否进口:</span>
                  <span v-if="goods.goods_attribute.is_import =='1'">是</span>
                  <span v-if="goods.goods_attribute.is_import =='0'">否</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.packaged_from">
                  <span class="selling_w">包装形式:</span>
                  {{goods.goods_attribute.packaged_from}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.packaged_specification">
                  <span class="selling_w">包装规格:</span>
                  {{goods.goods_attribute.packaged_specification}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.suttle">
                  <span class="selling_w">净重:</span>
                  {{goods.goods_attribute.suttle}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.whether_erasable">
                  <span class="selling_w">是否可擦:</span>
                  <span v-if="goods.goods_attribute.whether_erasable =='1'">是</span>
                  <span v-if="goods.goods_attribute.whether_erasable =='0'">否</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.whether_quick_drying">
                  <span class="selling_w">是否快干:</span>
                  <span v-if="goods.goods_attribute.whether_quick_drying =='1'">是</span>
                  <span v-if="goods.goods_attribute.whether_quick_drying =='0'">否</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.whether_waterproof">
                  <span class="selling_w">是否防水:</span>
                  <span v-if="goods.goods_attribute.whether_waterproof =='1'">是</span>
                  <span v-if="goods.goods_attribute.whether_waterproof =='0'">否</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.printing_logo">
                  <span class="selling_w">加印Logo:</span>
                  <span v-if="goods.goods_attribute.printing_logo =='1'">可以</span>
                  <span v-if="goods.goods_attribute.printing_logo =='0'">不可以</span>
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute.processing_customization"
                >
                  <span class="selling_w">加工定制:</span>
                  <span v-if="goods.goods_attribute.processing_customization =='1'">是</span>
                  <span v-if="goods.goods_attribute.processing_customization =='0'">否</span>
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.custom"
                  v-for="(custom,index) in goods.custom"
                  :key="index"
                >
                  <span class="selling_w" v-if="custom.name">{{custom.name}}:</span>
                  <span v-if="custom.name">{{custom.value}}</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.line_width">
                  <span class="selling_w">线幅：</span>
                  <span class="frBox">{{goods.line_width.join("、")}}</span>
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.ink_colour">
                  <span class="selling_w">油墨颜色：</span>
                  <span class="frBox">{{goods.ink_colour.join("、")}}</span>
                </p>
              </div>
              <div
                class="selling"
                style="margin-top: 0px;min-height: 230px;"
                v-if="goods.type=='2'"
              >
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.goods_brand">
                  <span class="selling_w">品牌：</span>
                  {{goods.goods_attribute.goods_brand}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.style_number">
                  <span class="selling_w" v-if="goods.style_number">型号：</span>
                  {{goods.style_number}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.texture">
                  <span class="selling_w">材质：</span>
                  {{goods.goods_attribute.texture}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.packaged_from">
                  <span class="selling_w">包装形式：</span>
                  {{goods.goods_attribute.packaged_from}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.product_usage">
                  <span class="selling_w">产品用途:</span>
                  {{goods.goods_attribute.product_usage}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.printing_logo">
                  <span class="selling_w">加印Logo:</span>
                  <span v-if="goods.goods_attribute.printing_logo =='1'">可以</span>
                  <span v-if="goods.goods_attribute.printing_logo =='0'">不可以</span>
                </p>
              </div>
              <div
                class="selling"
                style="margin-top: 0px;min-height: 230px;"
                v-if="goods.type=='3'"
              >
                <p style="margin-bottom: 15px;" v-if="goods.style_number">
                  <span class="selling_w">型号：</span>
                  {{goods.style_number}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.cargo_label">
                  <span class="selling_w">货号：</span>
                  {{goods.goods_attribute.cargo_label}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.texture">
                  <span class="selling_w">材质：</span>
                  {{goods.goods_attribute.texture}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.boundary_size">
                  <span class="selling_w">外形尺寸：</span>
                  {{goods.goods_attribute.boundary_size}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.weight">
                  <span class="selling_w">重量:</span>
                  {{goods.goods_attribute.weight}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.goods_brand">
                  <span class="selling_w">品牌：</span>
                  {{goods.goods_attribute.goods_brand}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.power">
                  <span class="selling_w">功率：</span>
                  {{goods.goods_attribute.power}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.transmittability">
                  <span class="selling_w">输送能力：</span>
                  {{goods.goods_attribute.transmittability}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.transmission_distance">
                  <span class="selling_w">输送距离:</span>
                  {{goods.goods_attribute.transmission_distance}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.function_use">
                  <span class="selling_w">功能用途:</span>
                  {{goods.goods_attribute.function_use}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.free_maintenance">
                  <span class="selling_w">免费维修期:</span>
                  {{goods.goods_attribute.free_maintenance}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.service_life">
                  <span class="selling_w">使用寿命:</span>
                  {{goods.goods_attribute.service_life}}
                </p>
              </div>
              <div
                class="selling"
                style="margin-top: 0px;min-height: 230px;"
                v-if="goods.type=='4'"
              >
                <p style="margin-bottom: 15px;" v-if="goods.process_form">
                  <span class="selling_w">加工形式：</span>
                  {{goods.process_form}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.main_process_equipment">
                  <span class="selling_w">主要加工设备：</span>
                  {{goods.goods_attribute.main_process_equipment}}
                </p>
                <p
                  style="margin-bottom: 15px;"
                  v-if="goods.goods_attribute.process_equipment_quantity"
                >
                  <span class="selling_w">加工设备数量：</span>
                  {{goods.goods_attribute.process_equipment_quantity}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.sunup_cargo">
                  <span class="selling_w">日出货量：</span>
                  {{goods.goods_attribute.sunup_cargo}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.year_max_process">
                  <span class="selling_w">年最大加工能力:</span>
                  {{goods.goods_attribute.year_max_process}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.process_material">
                  <span class="selling_w">加工原料：</span>
                  {{goods.goods_attribute.process_material}}
                </p>
                <p style="margin-bottom: 15px;" v-if="goods.goods_attribute.process_type">
                  <span class="selling_w">承接加工类型：</span>
                  {{goods.goods_attribute.process_type}}
                </p>
              </div>
              <div>
                <p style="font-size:14px;color:rgba(153,153,153,1);">所属类别</p>
                <p style="height: 1px;background-color: rgba(240,240,240,1);margin: 10px 0;"></p>
                <ul class="classify" v-if="goods.type=='0'">
                  <li v-if="goods.start_mode">
                    <span class="classify_a">按笔芯启动方式：</span>
                    <span class="classify_b">{{goods.start_mode}}</span>
                  </li>
                  <li v-if="goods.cartridge_replacement">
                    <span class="classify_a">按笔芯替换：</span>
                    <span class="classify_b">{{goods.cartridge_replacement}}</span>
                  </li>
                  <li v-if="goods.match_accessories">
                    <span class="classify_a">按配件搭配：</span>
                    <span class="classify_b">{{goods.match_accessories}}</span>
                  </li>
                  <li v-if="goods.texture">
                    <span class="classify_a">按材质：</span>
                    <span class="classify_b">{{goods.texture}}</span>
                  </li>
                  <li v-if="goods.cartridge_count">
                    <span class="classify_a">按笔芯多少：</span>
                    <span class="classify_b">{{goods.cartridge_count}}</span>
                  </li>
                  <li v-if="goods.technology">
                    <span class="classify_a">按表面工艺：</span>
                    <span class="classify_b">{{goods.technology}}</span>
                  </li>
                  <li v-if="goods.function">
                    <span class="classify_a">按功能：</span>
                    <span class="classify_b">{{goods.function}}</span>
                  </li>
                  <li v-if="goods.sculpt">
                    <span class="classify_a">按造型：</span>
                    <span class="classify_b">{{goods.sculpt}}</span>
                  </li>
                  <li v-if="goods.brand">
                    <span class="classify_a">按品牌：</span>
                    <span class="classify_b">{{goods.brand}}</span>
                  </li>
                  <li v-if="goods.ink">
                    <span class="classify_a">按油墨：</span>
                    <span class="classify_b">{{goods.ink}}</span>
                  </li>
                  <li v-if="goods.outline">
                    <span class="classify_a">按笔杆外形：</span>
                    <span class="classify_b">{{goods.outline}}</span>
                  </li>
                </ul>
                <ul class="classify" v-if="goods.type=='1'">
                  <li v-if="goods.goods_type.cartridge_ink">
                    <span class="classify_a">按油墨分类：</span>
                    <span class="classify_b">{{goods.goods_type.cartridge_ink}}</span>
                  </li>
                  <li v-if="goods.goods_type.cartridge_pen_point">
                    <span class="classify_a">按笔头分类：</span>
                    <span class="classify_b">{{goods.goods_type.cartridge_pen_point}}</span>
                  </li>
                  <li v-if="goods.goods_type.cartridge_pipeline">
                    <span class="classify_a">按油管分类：</span>
                    <span class="classify_b">{{goods.goods_type.cartridge_pipeline}}</span>
                  </li>
                  <li v-if="goods.goods_type.cartridge_line_width">
                    <span class="classify_a">按线幅分类：</span>
                    <span class="classify_b">{{goods.goods_type.cartridge_line_width}}</span>
                  </li>
                  <li v-if="goods.goods_type.cartridge_brand">
                    <span class="classify_a">按品牌分类：</span>
                    <span class="classify_b">{{goods.goods_type.cartridge_brand}}</span>
                  </li>
                </ul>
                <ul class="classify" v-if="goods.type=='2'">
                  <li v-if="goods.goods_type.parts" style="min-height: 40px;">
                    <span class="classify_a">零部件分类：</span>
                    <span class="classify_b">{{goods.goods_type.parts}}</span>
                  </li>
                  <li v-if="goods.goods_type.cartridge_mountings" style="min-height: 40px;">
                    <span class="classify_a">笔芯配件系列分类：</span>
                    <span class="classify_b">{{goods.goods_type.cartridge_mountings}}</span>
                  </li>
                  <li v-if="goods.goods_type.packaging" style="min-height: 40px;">
                    <span class="classify_a">包装分类：</span>
                    <span class="classify_b">{{goods.goods_type.packaging}}</span>
                  </li>
                  <li v-if="goods.goods_type.raw_material" style="min-height: 40px;">
                    <span class="classify_a">原材料分类：</span>
                    <span class="classify_b">{{goods.goods_type.raw_material}}</span>
                  </li>
                </ul>
                <ul class="classify" v-if="goods.type=='3'">
                  <li v-if="goods.goods_type.mechanical">
                    <span class="classify_a">机械设备：</span>
                    <span class="classify_b">{{goods.goods_type.mechanical}}</span>
                  </li>
                </ul>
                <ul class="classify" v-if="goods.type=='4'">
                  <li v-if="goods.goods_type.surface_treatment">
                    <span class="classify_a">按表面处理分类：</span>
                    <span class="classify_b">{{goods.goods_type.surface_treatment}}</span>
                  </li>
                  <li v-if="goods.goods_type.printing_technology">
                    <span class="classify_a">按印刷工艺分类：</span>
                    <span class="classify_b">{{goods.goods_type.printing_technology}}</span>
                  </li>
                  <li v-if="goods.goods_type.mould_process">
                    <span class="classify_a">按模具加工分类：</span>
                    <span class="classify_b">{{goods.goods_type.mould_process}}</span>
                  </li>
                </ul>
              </div>
              <div style="border:none;clear: both;margin-top: 0;" class="lookInfo">
                <span class="lookInfoTxt" style="margin-right: 30px;width:158px;">
                  <a
                    target="_blank"
                    href="http://wpa.qq.com/msgrd?v=3&uin=2355863254&site=qq&menu=yes"
                    style="color: white;"
                  >立即询价</a>
                </span>
                <span class="lookInfoTxt" @click="updateLook()" v-if="islook">查看供应商信息</span>
              </div>
            </div>
          </div>
        </div>

        <div class="extInfo fr">
          <div class="looks">看了又看</div>
          <div class="scrollbox" v-if="lookThenGoodsList.length >0">
            <div id="scrollDiv">
              <ul>
                <div data-v-498142aa class="el-carousel el-carousel--horizontal">
                  <div class="el-carousel__container" style="height: 835px;overflow: hidden">
                    <div
                      data-v-498142aa
                      class="el-carousel__item is-active is-animating"
                      :style="'transform: translateY('+(lookThenGoodsShow*167-167)+'px) scale(1);' + (lookThenGoodsShow == lookThenGoodsShowList.length-1 ? 'display: none':'')"
                      v-for="(lookThenGoodsShow,lookThenGoodsShowIndex) in lookThenGoodsShowList "
                      :key="lookThenGoodsShowIndex"
                    >
                      <li
                        style="cursor: pointer"
                        @mouseover="stopChangeLookThenGoodsShow()"
                        @mouseout="startChangeLookThenGoodsShow()"
                        @click="toDetail(lookThenGoodsList[lookThenGoodsShowIndex])"
                      >
                        <div style="text-align: center;width:150px;height:134px">
                          <img
                            :src="lookThenGoodsList[lookThenGoodsShowIndex].img[0]"
                            alt
                            width="134px"
                            height="134px"
                            style="display: block;margin: auto;"
                          />
                        </div>
                        <h3>
                          <a
                            href="#"
                            class="linktit"
                          >{{lookThenGoodsList[lookThenGoodsShowIndex].title}}</a>
                        </h3>
                      </li>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div class="scroltit">
              <i class="iconfont icon-xiangshang2" @click="changeLookThenGoodsShowUp" id="but_down"></i>
              <i class="iconfont icon-xiangxia2" @click="changeLookThenGoodsShowDown" id="but_up"></i>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <!-- 商品介绍结束 -->

      <!-- 商品详情开始 -->
      <div
        class="w contentDetial"
        style="margin-top: 12px;background:#FFFFFF;"
        v-if="goods"
        v-show="chakan"
      >
        <!-- <hr color="#F0F0F0" /> -->
        <ul class="clearfix detialUl">
          <div style="border-bottom: 1px solid #ccc;overflow: hidden;">
            <li style="padding-left: 5px;">
              <span>型号：</span>
              <span class="frBox">{{goods.style_number}}</span>
            </li>
            <li>
              <span>地区：</span>
              <span class="frBox">{{goods.provider.region}}</span>
            </li>
            <li>
              <span>地址：</span>
              <span class="frBox">{{goods.provider.address}}</span>
            </li>
          </div>
          <div style="border-bottom: 1px solid #ccc;overflow: hidden;">
            <li style="padding-left: 5px;">
              <span>联系人：</span>
              <span class="frBox">{{goods.provider.company_name}}</span>
            </li>

            <li class="clearfix">
              <span>固定电话：</span>
              <span class="frBox">{{goods.provider.fixPhone.join("、")}}</span>
            </li>
            <li class="clearfix">
              <span>QQ：</span>
              <span class="frBox">{{goods.provider.qq.join("、")}}</span>
            </li>
          </div>
          <div style="overflow: hidden;">
            <li class="clearfix" style="padding-left: 5px;border:none">
              <span>手机号码：</span>
              <span class="frBox">{{goods.provider.phone}}</span>
            </li>
            <li class="clearfix" style="border:none">
              <span>库存：</span>
              <span
                class="frBox"
              >{{(goods.spot_goods != null && goods.spot_goods == 1)? goods.total_inventory : '非现货'}}</span>
            </li>
          </div>
        </ul>
      </div>
      <!-- 查看商品详情结束 -->
      <!-- 图文介绍 -->
      <div
        class="w contentDetial"
        style="margin-top: 20px;text-align: center;"
        v-show="contentDetialShow"
      >
        <el-container>
          <el-main style="height: unset;" v-html="introduce"></el-main>
        </el-container>
        <br />
      </div>
      <!-- 图文介绍结束 -->
      <!-- 猜你喜欢开始 -->
      <div
        class="guessLikeBox"
        v-if="guessLikeGoodsList && guessLikeGoodsList.length > 0"
        style="margin-top: 20px;"
      >
        <div class="w guessLike">
          <div class="guessLike_title">
            <img src="../../../static/img/guessLike.png" alt />
          </div>
          <div class="guessLike_content">
            <ul class="clearfix">
              <li
                v-for="(guessLikeGoods,index) in guessLikeGoodsList"
                :key="index"
                @click="toDetail(guessLikeGoods)"
              >
                <div class="imgBox">
                  <img :src="guessLikeGoods.img[0]" alt />
                </div>
                <h3>{{guessLikeGoods.title}}</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 猜你喜欢结束 -->
    </div>
    <!-- 遮罩层弹窗 -->
    <div class="popup" ref="mask" v-show="isShow">
      <div class="popup_view">
        <div style="height: 50px;">
          <i class="iconfont icon-guanbi2fill" id="fork_cha" @click="cancel()"></i>
        </div>
        <p>{{warn}}</p>
        <button @click="toUrl(warnType)" style="background:#FC9263;">{{confirmButtonText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serverAPI.config.js";
export default {
  data() {
    return {
      weicaigou: true,
      caigou: false,
      chakan: false,
      islook: true,
      downIcon: true,
      count: 0,
      username: "",
      id: "",
      isC: false,
      goods: null,
      masterImg: "",
      lookThenGoodsList: [],
      lookThenGoodsShowList: [],
      timerChange: "",
      isChangShow: true,
      dealer: false,
      VISITOR: "",
      roles: "",

      input: "",
      username: "",
      scopeList: [],
      toggle: false,
      ids: [],
      guessLikeGoodsList: [],
      isShow: false,
      warn:
        "亲爱的 周鲁白 会员，您还不是我们的经销商会员，申请成为经销商会员之后，可以查看平台上所有供应商的信息，快来申请吧~",
      confirmButtonText: "我要申请",
      warnType: 0,
      imgUptime: false,
      imgUptimes: false,
      goodsSpeList: [],
      goodSpeShowList: [],
      lookinfo: false,
      //   显示商品分类
      isShowClassify: false,
      youLikeGoodsList: [],
      isMove: false,
      goods1: null,

      dataIndex: 0,
      typeShow: -1,
      speShow: -1,
      typeSaveShow: -1,
      speSaveShow: -1,
      setLevel: [],
      introduce: null,
      contentDetialShow: false //图文介绍展现
    };
  },
  components: {},
  updated() {
    this.jqueryEvent();
    console.log(this.introduce);
    if (
      this.introduce != "" &&
      this.introduce != "<p><br></p>" &&
      this.introduce != "<p>&nbsp;</p>"
    ) {
      this.contentDetialShow = true;
    } else {
      this.contentDetialShow = false;
    }
  },
  created() {
    this.getSetLevel();
    setInterval(() => {
      this.username = localStorage.getItem("username");
    }, 10);
    this.username = localStorage.getItem("username");
    this.roles =
      localStorage.getItem("roles") != null
        ? localStorage.getItem("roles")
        : "";
    this.VISITOR = localStorage.getItem("VISITOR");
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getGoods();
    this.isCollection();
    this.getLookThenGoodsList();
    this.getGuessYouLike();
    if (!this.roles || this.roles.indexOf("dealer") == -1) {
      this.dealer = false;
    } else {
      this.dealer = true;
    }
    if (!this.roles || this.roles.indexOf("dealer") == -1) {
      this.caigou = false;
    } else {
      this.caigou = true;
      this.weicaigou = false;
    }
  },
  methods: {
    //猜你喜欢
    getGuessYouLike() {
      if (!this.username && this.VISITOR) {
        this.username = this.VISITOR;
      }
      this.$http({
        url: url.guessYouLike + "/" + this.username,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.guessLikeGoodsList = res.data.data;
          this.guessLikeGoodsList.map(item => {
            item.img = JSON.parse(item.img);
          });
          this.guessLikeGoodsList.splice(
            12,
            this.guessLikeGoodsList.length - 12
          );
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getSetLevel() {
      this.$http({
        url: url.getSetLevel,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.setLevel = res.data.data;
        }
      });
    },
    findGuessYouLikes() {
      this.goodsSpeList.map(item => {
        this.findGuessYouLike(item);
      });
    },
    findGuessYouLike(goodsSpe) {
      var fileName = "";
      var speValue = "";
      var index = 0;
      if (goodsSpe) {
        if (goodsSpe.name == "笔芯启动方式") {
          fileName = "start_mode";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 0;
        }
        if (goodsSpe.name == "材质") {
          fileName = "texture";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 1;
        }
        if (goodsSpe.name == "功能") {
          fileName = "function";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 2;
        }
        if (goodsSpe.name == "油墨") {
          fileName = "ink";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 3;
        }
        if (goodsSpe.name == "笔芯替换") {
          fileName = "cartridge_replacement";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 4;
        }
        if (goodsSpe.name == "笔芯数量") {
          fileName = "cartridge_count";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 5;
        }
        if (goodsSpe.name == "造型") {
          fileName = "sculpt";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 6;
        }
        if (goodsSpe.name == "笔杆外形") {
          fileName = "outline";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 7;
        }
        if (goodsSpe.name == "搭配配件") {
          fileName = "match_accessories";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 8;
        }
        if (goodsSpe.name == "表面工艺") {
          fileName = "technology";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 9;
        }
        if (goodsSpe.name == "品牌") {
          fileName = "brand";
          speValue = goodsSpe.goodsSpecificationValues[0].name;
          index = 10;
        }
      }
      this.$http({
        url: url.findGuessYouLike + "/" + fileName + "/" + speValue,
        method: "get"
      }).then(res => {
        if (res.data.code === 20000) {
          var data = res.data.data;
          data.map(item => {
            item.img = JSON.parse(item.img);
          });
          this.youLikeGoodsList[index] = data;
        }
      });
    },
    //获取商品的详细信息
    // 测试商品ID 1189795369467383808(零部件)   1189787452760526848(笔芯) 1189431095775596544(成品笔)  1189804912301707264(机械设备)    1189817215621402624(配套加工)
    // 1187626293039075328(正式数据)
    getGoods() {
      if (!this.username && this.VISITOR) {
        this.username = this.VISITOR;
      }
      //   this.$http({
      this.$http({
        // url:  'http://172.16.0.138:9009/goods/findGoodsProvider/' + this.id + '/' + this.username,  //本地
        url: url.goods + "/" + this.id + "/" + this.username,
        // url: url.goods + "/1189795369467383808/" + this.username,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          var data = res.data.data;
          data.provider.qq = JSON.parse(data.provider.qq);
          if (data.provider.fixPhone) {
            data.provider.fixPhone = JSON.parse(data.provider.fixPhone);
          } else {
            data.provider.fixPhone = [];
          }
          if (data.custom) {
            data.custom = JSON.parse(data.custom);
          }
          if (data.goods_type) {
            data.goods_type = JSON.parse(data.goods_type);
          }
          if (data.goods_attribute) {
            data.goods_attribute = JSON.parse(data.goods_attribute);
          }
          if (data.present) {
            data.present = JSON.parse(data.present);
          }
          if (data.ink_colour) {
            data.ink_colour = JSON.parse(data.ink_colour);
          }
          if (data.line_width) {
            data.line_width = JSON.parse(data.line_width);
          }
          this.goods = data;
          this.introduce = this.goods.introduce;
          if (this.goods.price_range) {
            this.goods.price_range = JSON.parse(this.goods.price_range);
          }
          this.initGoods(this.goods);
          if (data.visitorId) {
            this.VISITOR = data.visitorId;
          }
          if (this.goods.provider.is_look_goods.indexOf(this.username) > -1) {
            this.islook = false;
          } else {
            this.islook = true;
          }
          this.masterImg = this.goods.img[0];
          this.jqueryEvent();
          if (this.goods.provider.phone.indexOf("*") != -1) {
            this.chakan = false;
          } else {
            this.chakan = true;
          }
        } else {
          console.log(res);
        }
      });
    },
    initGoods(goods) {
      var data = goods;
      data.img = JSON.parse(data.img);
      if (data.effluent) {
        data.effluent = JSON.parse(data.effluent);
        data.colour = JSON.parse(data.colour);
      }
      this.goods1 = data;
      this.jqueryEvent();
    },
    //获取看了又看
    getLookThenGoodsList() {
      this.$http({
        url: url.lookedAndLooked + "/" + this.id,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          if (res.data.code == 20000) {
            this.lookThenGoodsList = res.data.data;
            this.lookThenGoodsList.map(item => {
              item.img = JSON.parse(item.img);
            });
            this.createLookThenGoodsShow();
          } else {
            this.$message.error(res.data.message);
          }
        }
      });
    },
    createLookThenGoodsShow() {
      var lookThenGoodsShowList = [];
      for (var i = 0; i < this.lookThenGoodsList.length; i++) {
        lookThenGoodsShowList.push(i);
      }
      this.lookThenGoodsShowList = lookThenGoodsShowList;
      this.startChangeLookThenGoodsShow();
    },
    changeLookThenGoodsShowUp() {
      this.stopChangeLookThenGoodsShow();
      if (!this.isChangShow) {
        return;
      }
      this.isChangShow = false;
      this.lookThenGoodsShowList.unshift(
        this.lookThenGoodsShowList[this.lookThenGoodsShowList.length - 1]
      );
      this.lookThenGoodsShowList.pop();
      setTimeout(() => {
        this.isChangShow = true;
      }, 400);
      this.startChangeLookThenGoodsShow();
    },
    changeLookThenGoodsShowDown() {
      this.stopChangeLookThenGoodsShow();
      if (!this.isChangShow) {
        return;
      }
      this.isChangShow = false;
      this.lookThenGoodsShowList.push(this.lookThenGoodsShowList[0]);
      this.lookThenGoodsShowList.shift();
      setTimeout(() => {
        this.isChangShow = true;
      }, 400);
      this.startChangeLookThenGoodsShow();
    },
    stopChangeLookThenGoodsShow() {
      clearInterval(this.timerChange);
      this.timerChange = null;
    },
    startChangeLookThenGoodsShow() {
      this.timerChange = setInterval(this.changeLookThenGoodsShowUp, 2000);
    },
    collect() {
      this.downIcon = !this.downIcon;
    },
    //获取是否已经收藏
    isCollection() {
      this.$http({
        url: url.isCollection + "/" + this.id + "/" + this.username,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.isC = res.data.data;
        }
      });
    },

    //收藏
    addCollection() {
      if (!this.username) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请登录后再收藏");
        return;
      }
      this.$http({
        url: url.addCollection + "/" + this.id + "/" + this.username,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.goods.collection_count =
            parseInt(this.goods.collection_count) + 1;
          this.isCollection();
        }
      });
    },

    //取消收藏
    deleteCollection() {
      this.$http({
        url: url.deleteCollection + "/" + this.id + "/" + this.username,
        method: "get"
      }).then(res => {
        if (res.data.code == 20000) {
          this.goods.collection_count =
            parseInt(this.goods.collection_count) - 1;
          this.isCollection();
        }
      });
    },
    toHref(url) {
      var href = "http://www.bhnc114.com" + url;
      window.open(href);
    },

    updateLook() {
      //是否登录
      if (!this.username) {
        if (document.getElementsByClassName("el-message").length == 0)
          this.$message.error("请先登录");
        return;
      }
      //级别不足查看
      if (
        this.goods.current_level <= "1" ||
        this.roles.indexOf("dealer") == -1
      ) {
        if (this.roles.indexOf("dealer") == -1) {
          this.warn =
            "亲爱的 " +
            (localStorage.getItem("username")
              ? localStorage.getItem("username")
              : "用户") +
            "，您还不是我们的经销商会员，申请成为经销商会员之后，可以查看平台上所有供应商的信息，快来申请吧~";
          this.confirmButtonText = "我要申请";
          this.warnType = 0;
          this.isShow = true;
          return;
        }
        if (this.goods.current_level <= "1") {
          this.warn =
            "亲爱的 " +
            localStorage.getItem("username") +
            " 会员，您的会员等级不足，会员等级2以上，可以查看平台上所有供应商的信息，快来充值吧~";
          this.confirmButtonText = "去充值";
          this.warnType = 1;
          this.isShow = true;
          return;
        }
      } else if (
        this.goods.current_level == "89" ||
        this.roles.indexOf("dealer") == -1
      ) {
        if (this.roles.indexOf("dealer") == -1) {
          this.warn =
            "亲爱的 " +
            (localStorage.getItem("username")
              ? localStorage.getItem("username")
              : "用户") +
            "，您还不是我们的经销商会员，申请成为经销商会员之后，可以查看平台上所有供应商的信息，快来申请吧~";
          this.confirmButtonText = "我要申请";
          this.warnType = 0;
          this.isShow = true;
          return;
        }
        if (this.goods.current_level == "89") {
          var level = "";
          for (var i = 0; i < this.setLevel.length; i++) {
            if (this.goods.currentIntegral >= this.setLevel[i].start_integral) {
              level = this.setLevel[i].level;
            }
          }
          if (level == "1") {
            this.warn =
              "亲爱的 " +
              localStorage.getItem("username") +
              " 会员，您的会员等级不足，会员等级2以上，可以查看平台上所有供应商的信息，快来充值吧~";
            this.confirmButtonText = "去充值";
            this.warnType = 1;
            this.isShow = true;
            return;
          } else {
            this.$confirm(
              "本次查看供应商信息将消耗" +
                this.goods.look_provider +
                "积分，是否继续查看？",
              "提示",
              {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
                center: true
              }
            ).then(() => {
              this.$http({
                method: "put",
                url:
                  url.updateLook +
                  "/" +
                  this.goods.provider.id +
                  "/" +
                  this.username
              }).then(res => {
                this.getGoods();
                this.isCollection();
                this.chakan = true;
              });
            });
          }
        }
      } else {
        //级别满足查看
        this.$confirm(
          "本次查看供应商信息将消耗" +
            this.goods.look_provider +
            "积分，是否继续查看？",
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }
        ).then(() => {
          this.$http({
            method: "put",
            url:
              url.updateLook +
              "/" +
              this.goods.provider.id +
              "/" +
              this.username
          }).then(res => {
            this.getGoods();
            this.isCollection();
            this.chakan = true;
          });
        });
      }
    },
    // 关闭弹窗
    cancel() {
      this.isShow = !this.isShow;
    },
    // 弹窗页面申请经销商会员
    toUrl(type) {
      var username = localStorage.getItem("username");
      var password = localStorage.getItem("password");
      var roles = localStorage.getItem("roles");
      var Authorization = localStorage.getItem("Authorization");
      var id = localStorage.getItem("ID");
      if (type == 0) {
        var href = `http://www.bhnc114.com/disIntroduce`;
        window.open(href);
      }
      if (type == 1) {
        var href =
          "http://buyer.bhnc114.com/jump?Authorization=" +
          Authorization +
          "&a=" +
          username +
          "&roles=" +
          roles +
          "&id=" +
          id +
          "&recharge=1";
        window.open(href);
      }
    },
    //格式化价格
    formatPrice(str) {
      return parseFloat(str).toFixed(2);
    },

    toDetail(goods) {
      // if (goods.is_pay == "1") {
      //   location.href = goods.id + ".html";
      //   return;
      // } else {
      //   location.href = "simple" + goods.id + ".html";
      //   return;
      // }
      console.log(goods);
      this.utils.toDetailsss(goods);
    },
    toSubmitData() {
      location.href = "http://www.bhnc114.com/submitData";
    },
    //样式事件
    jqueryEvent() {
      if (this.goods1) {
        for (var j = 0; j < this.goods1.img.length; j++) {
          $("#img" + j).mousemove(function() {
            $("#preview .jqzoom img").attr("src", $(this).attr("src"));
          });
        }
      }
      $(".pick_color ul li").click(function(event) {
        $(this).addClass("tabs");
        $(this)
          .siblings()
          .removeClass("tabs");
      });
      var tempLength = 0; //临时变量,当前移动的长度
      var viewNum = 5; //设置每次显示图片的个数量
      var moveNum = 2; //每次移动的数量
      var moveTime = 300; //移动速度,毫秒
      var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
      var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
      var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
      var countLength =
        (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度

      //下一张
      $(".spec-scroll .next").bind("click", function() {
        if (tempLength < countLength) {
          if (countLength - tempLength > moveLength) {
            scrollDiv.animate({ left: "-=" + moveLength + "px" }, moveTime);
            tempLength += moveLength;
          } else {
            scrollDiv.animate(
              {
                left: "-=" + (countLength - tempLength) + "px"
              },
              moveTime
            );
            tempLength += countLength - tempLength;
          }
        }
      });
      //上一张
      $(".spec-scroll .prev").bind("click", function() {
        if (tempLength > 0) {
          if (tempLength > moveLength) {
            scrollDiv.animate(
              {
                left: "+=" + moveLength + "px"
              },
              moveTime
            );
            tempLength -= moveLength;
          } else {
            scrollDiv.animate(
              {
                left: "+=" + tempLength + "px"
              },
              moveTime
            );
            tempLength = 0;
          }
        }
      });
    }
    //分界
  }
};
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
#bhncDetails {
  overflow: hidden;
  .lookInfo {
    text-align: right;
    margin-top: 50px;
  }

  .lookInfo .lookInfoTxt {
    display: inline-block;
    width: 128px;
    height: 32px;
    background: #d21d27;
    -webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.36);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.36);
    border-radius: 8px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: white;
    cursor: pointer;
  }

  .title_text {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 26px;
  }

  .selling {
    margin: 25px 0;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .selling .selling_w {
    width: 112px;
    display: inline-block;
    text-align: right;
    // margin-right: 5px;
  }

  .classify {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    display: inline-block;
  }
  .classify li {
    width: 33%;
    display: inline-block;
    float: left;
    margin-bottom: 8px;
  }
  .classify li .classify_a {
    width: 100px;
    display: inline-block;
    text-align: right;
  }
  .classify li .classify_b {
    width: 96px;
    display: inline-block;
    float: right;
  }
  /* Clear Fix */
  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    display: inline-block;
  }
  .fr {
    float: right;
    font-size: 14px;
    font-family: MicrosoftYaHeiLight;
    font-weight: 300;
  }
  .fr a {
    color: #cccccc !important;
    margin-left: 10px;
  }
  .extInfo {
    width: 184px;
    min-height: 520px;
    float: right;
    background-color: #fff;
    border-left: 7px solid #f2f2f2;
  }

  .looks {
    text-align: center;
    position: relative;
    font-size: 14px;
    color: #727273;
    margin: 15px auto;
    width: 150px;
  }

  .looks::before {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 1px;
    background: #c7c7c7;
    display: inline-block;
    content: "";
    left: 0;
  }

  .looks::after {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 1px;
    background: #c7c7c7;
    display: inline-block;
    content: "";
    right: 0;
  }

  .scrollbox {
    width: 150px;
    margin: 0 auto;
    overflow: hidden;
  }

  #scrollDiv {
    width: 150px;
    height: 500px;
    overflow: hidden;
  }

  #scrollDiv li {
    border: 1px solid #d8f0fc;
    width: 150px;
    height: 163px;
    overflow: hidden;
    vertical-align: bottom;
    zoom: 1;
    margin-bottom: 10px;
  }

  #scrollDiv li h3 {
    padding: 5px 10px;
    font-size: 12px;
    color: #666666;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  #scrollDiv li h3 a {
    color: #666666;
    text-decoration: none;
  }

  .scroltit {
    margin: 10px 0;
    height: 26px;
    line-height: 26px;
    text-align: center;
  }

  #but_down {
    margin-right: 15px;
    text-indent: -9999px;
    cursor: pointer;
  }

  #but_up {
    text-indent: -9999px;
    cursor: pointer;
  }

  .detialUl {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-bottom: 22px;
  }

  .detialUl li {
    width: 40%;
    font-size: 16px;
  }

  .detialUl li:nth-child(3n) {
    width: 20%;
  }

  .detialUl .wrapBox span {
    float: left;
  }

  .detialUl .wrapBox .frBox {
    float: left;
    width: 70%;
    line-height: 1.5;
  }
  /* Hide from IE Mac */
  .clearfix {
    display: block;
  }
  .txt {
    padding-left: 5px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #666666;
  }

  .iconfont {
    font-size: 16px !important;
  }
  .topDetail {
    background-color: #fff;
  }
  .guessLikeBox .guessLike {
    padding-top: 32px;
  }

  .guessLikeBox .guessLike .guessLike_content {
    padding: 0 12px 48px;
  }

  .guessLikeBox .guessLike .guessLike_content ul li {
    margin-top: 28px;
    margin-right: 19px;
    float: left;
    width: 180px;
    padding-top: 20px;
    -webkit-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  .guessLikeBox .guessLike .guessLike_content ul li:hover {
    outline: 1px solid #d8f0fc;
  }

  .guessLikeBox .guessLike .guessLike_content ul li:nth-child(6n) {
    margin-right: 0;
  }

  .guessLikeBox .guessLike .guessLike_content ul .imgBox {
    width: 140px;
    height: 128px;
    margin: auto;
  }

  .guessLikeBox .guessLike .guessLike_content ul .imgBox img {
    width: 100%;
    height: 100%;
  }

  .guessLikeBox .guessLike .guessLike_content ul h3 {
    padding: 0 50px;
    padding-top: 8px;
    padding-bottom: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 10px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #666666;
  }
  /*图片小图预览列表*/
  .spec-preview {
    width: 350px;
    height: 350px;
  }

  .spec-scroll {
    clear: both;
    margin-top: 10px;
    width: 352px;
  }

  .spec-scroll .prev {
    float: left;
    margin-right: 4px;
  }

  .spec-scroll .next {
    float: right;
  }

  .spec-scroll .prev,
  .spec-scroll .next {
    display: block;
    font-family: "宋体";
    text-align: center;
    width: 10px;
    height: 54px;
    line-height: 54px;
    border: 1px solid #ccc;
    background: #ebebeb;
    cursor: pointer;
    text-decoration: none;
  }

  .spec-scroll .items {
    float: left;
    position: relative;
    width: 322px;
    height: 56px;
    overflow: hidden;
  }

  .spec-scroll .items ul {
    position: absolute;
    width: 999999px;
    height: 56px;
  }

  .spec-scroll .items ul li {
    float: left;
    width: 64px;
    text-align: center;
  }

  .spec-scroll .items ul li img {
    border: 1px solid #ccc;
    padding: 2px;
    width: 50px;
    height: 50px;
  }

  .spec-scroll .items ul li img:hover {
    border: 2px solid #ff6600;
    padding: 1px;
  }

  .w {
    width: 1200px;
    margin: 0 auto;
    background-color: white;
  }
  .shareLike {
  }

  .shareLike .iconfont {
    cursor: pointer;
  }

  .shareLike .icon-like {
    color: #ff0000;
  }
  .detailLeft {
    padding: 16px;
    width: 1007px;
  }

  .detailRight {
    width: 184px;
    height: 300px;
    border: 1px solid;
  }
  .contentDetial {
    background: #fff;
  }

  .contentDetial .content_title {
    padding-top: 19px;
    padding-left: 15px;
    padding-left: 20px;
  }

  .contentDetial .content_title i {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #3d91e7;
    cursor: pointer;
  }

  .contentDetial ul {
    padding: 0 40px;
  }

  .contentDetial ul li {
    padding-top: 21px;
    padding-bottom: 14px;
    float: left;
  }
  /*图片放大镜样式*/
  .jqzoom {
    float: left;
    border: 1px solid #dfdfdf;
    position: relative;
    padding: 0px;
    cursor: pointer;
    margin: 0px;
    display: block;
  }

  .zoomdiv {
    z-index: 100;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 350px;
    height: 350px;
    background: #ffffff;
    border: 1px solid #cccccc;
    display: none;
    text-align: center;
    overflow: hidden;
  }

  .jqZoomPup {
    z-index: 10;
    visibility: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    border: 1px solid #aaa;
    background: #ffffff
      /*url(../../../static/img/zoom.png) 50% center no-repeat*/;
    opacity: 0.5;
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    filter: alpha(Opacity=50);
  }
  .extInfo {
    width: 184px;
    min-height: 585px;
    float: right;
    background-color: white;
    border-left: 7px solid #f2f2f2;
  }
  .lookInfo .lookInfoTxt {
    width: 216px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .trade .trade_jia {
    line-height: 30px;
  }
  .classify li .classify_b {
    text-indent: 5px;
  }
  .classify {
    display: block;
    min-height: 85px;
  }
  .guessLikeBox .guessLike .guessLike_content ul .imgBox {
    width: 140px;
    height: 140px;
    margin: auto;
  }

  .detailImg img {
    width: 551px;
    height: 551px;
    display: block;
    margin: auto;
    box-shadow: none;
  }

  .detailImg {
    width: 680px;
    height: 551px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  }
  /* 遮罩层弹窗  */
  .popup {
    width: 100%;
    background-color: rgba(102, 102, 102, 0.2);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 998;
    min-height: 2000px;
  }

  #fork_cha {
    float: right;
    font-size: 26px;
    opacity: 0.5;
    margin-top: 7px;
    margin-right: 7px;
    cursor: pointer;
  }

  .popup_view {
    position: fixed;
    width: 419px;
    height: 280px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: url("../../../static/img/popup.png") no-repeat;
    background-size: cover;
    text-align: center;
  }

  .popup_view p {
    color: white;
    width: 329px;
    height: 73px;
    display: inline-block;
    text-align: left;
    line-height: 30px;
    font-size: 15px;
    font-family: MicrosoftYaHeiLight;
    font-weight: bold;
  }

  .popup_view button {
    width: 133px;
    height: 39px;
    background: #4695e7;
    border-radius: 4px;
    font-size: 15px;
    font-family: MicrosoftYaHeiLight;
    font-weight: bold;
    color: white;
    margin-top: 85px;
  }
  .isVisible {
    background: rgba(240, 240, 240, 1);
  }
  .trade {
    display: inline-block;
  }
  .trade li {
    display: inline-block;
  }
  .trade li .qianke {
    font-size: 12px;
    min-width: 100px;
    display: inline-block;
    text-align: center;
  }
  .trade .trade_jia {
    min-width: 100px;
    display: inline-block;
    text-align: center;
  }
}
</style>
