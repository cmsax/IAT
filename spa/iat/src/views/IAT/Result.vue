<template>
  <section v-page-title :data-title="pageTitle" class="design">
    <div class="container">
      <el-row type="flex" class="row">
        <el-col :span="10" style="float:left; display:block;">
          <el-image :src="require('@/assets/result.svg')"></el-image>
        </el-col>
        <el-col :span="14">
          <h1>
            谢谢你！<br />
            你已经完成本次有关饮食的内隐联想测验！
          </h1>
          <p>
            寻找色彩和美味之间的关系时，可以直接询问人们这一问题，但是人们的回答是“外显”的，人们会自省以管理自己给他人留下的印象，这就使得答案可能不会真实反应所有的想法和感受。
          </p>
          <p>
            因此需要内隐联想测试来测量微妙的“内隐”想法。通过比较将美味类的单词与暖色食物图片放为一组，和美味类的单词与冷色食物图片放为一组的反应时间差，可以间接了解你多大程度上将美味与冷色或者暖色联系起来。
          </p>
          <p>
            基于不同的个人经历和接触不同的社会信息，最终结果可能不一样。
            <!-- 你可能会想知道自己测试的结果，你可以点击[继续]查看结果。 -->
          </p>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TYPES } from "@/store/mutations";
@Component({})
export default class Result extends Vue {
  private pageTitle = "测验完成 | 饮食内隐联想测验";
  mounted() {
    if (!this.$store.state.finished) {
      this.$router.push("/iat/welcome");
    }
  }
}
</script>

<style lang="less">
section.design {
  margin-top: 10%;
  margin-bottom: 80px;
  padding-bottom: 40px;
  padding: 120px 0;
  display: block;
  margin-bottom: 80px;
  padding-bottom: 40px;
  position: relative;
  flex-wrap: wrap;
  padding: 30px;
  h1 {
    font-size: 34px;
    text-align: left;
  }
  p {
    line-height: 25px;
    text-align: left;
    font-size: 19px;
  }
  .container {
    max-width: 1200px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    .row {
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }
  }
}
section.design:after {
  right: 20px;
  top: 0;
  bottom: 0;
  left: 40px;
  border-radius: 20% 50% 50% 30%;
  transform: skewY(20deg) skewX(-22deg);
  width: 36%;
  content: " ";
  background-image: linear-gradient(to bottom, #697ded, #5e30c1);
  position: absolute;
  z-index: -1;
}
</style>
