<template>
  <div id="welcome" v-page-title :data-title="pageTitle">
    <div class="container">
      <h1>欢迎参加“饮食内隐联想测验”！</h1>
      <el-tabs
        :value="tabs[currentTabIndex]"
        :before-leave="handleTabLeave"
        style="min-height: 400px;"
      >
        <!-- 项目简介 -->
        <el-tab-pane label="项目简介" name="welcome" :disabled="true">
          <h2>项目简介</h2>
          <p>
            您将完成一些简短的调查表和一个内隐关联测试，请您尽快将单词和图片分类。这份问卷应该可以在10分钟内完成。
          </p>
          <p>
            这项研究可以帮助我们了解人们对美味食物的一些看法。本次收集的所有数据都是机密的，您计算机的IP地址存将与人口统计信息和其他研究数据分开存储，以确保隐私。
          </p>
          <p>如果您有任何疑问，请联系 i.feiweiwei@gmail.com</p>

          <h2>注意事项</h2>
          <p style="font-weight:800;">
            需使用带有物理键盘的计算机完成任务（台式机或者笔记本电脑）。
          </p>
        </el-tab-pane>
        <!-- 测验说明 -->
        <el-tab-pane label="测验说明" name="intro" :disabled="true">
          <h2>测验说明</h2>
          <p>
            接下来，请您使用键盘上 <span class="in">e</span> 和
            <span class="in">i</span>
            两个字母键，将出现的词语或者图片尽快归类。
          </p>
          <p>有四个组，每个组为：</p>
          <h3>1.形容美味的词语：</h3>
          <p>
            <el-tag
              style="background-color: transparent; color: black; margin-right: 5px;"
              v-for="(word, index) in words.positive"
              :key="'positive-word-' + index"
              >{{ word }}</el-tag
            >
          </p>
          <h3>2.形容不美味的词语：</h3>
          <p>
            <el-tag
              style="background-color: transparent; color: black; margin-right: 5px;"
              v-for="(word, index) in words.negative"
              :key="'negative-word-' + index"
              >{{ word }}</el-tag
            >
          </p>
          <h3>3.暖色食物图片</h3>
          <p style="text-indent:0;">
            <img :src="images.warmImageIntro" style="width: 100%;" />
          </p>
          <h3>4.冷色食物图片</h3>
          <p style="text-indent:0;">
            <img :src="images.coldImageIntro" style="width: 100%;" />
          </p>
          <p>本测验一共有七个部分，每部分开始前会有操作说明，请您认真阅读。</p>
        </el-tab-pane>

        <!-- 基本表单信息 -->
        <el-tab-pane label="基本表单" name="form" :disabled="true">
          <h2>请填写您的基本信息</h2>
          <div class="form">
            <el-form
              :ref="userFormName"
              :model="userInfoForm"
              label-width="80px"
            >
              <el-form-item label="您的出生年份">
                <el-date-picker
                  v-model="userInfoForm.birthYear"
                  type="year"
                  placeholder="选择或输入年份"
                  value-format="yyyy"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="您的性别">
                <el-radio-group v-model="userInfoForm.gender" size="medium">
                  <el-radio-button :label="0">女</el-radio-button>
                  <el-radio-button :label="1">男</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="您的最高学历">
                <el-radio-group v-model="userInfoForm.edu" size="medium">
                  <el-radio-button
                    v-for="(item, index) in eduOptions"
                    :key="index"
                    :label="item[0]"
                    >{{ item[1] }}</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="您是否有视觉障碍">
                <el-radio-group v-model="userInfoForm.dysopia" size="medium">
                  <el-radio-button
                    v-for="(item, index) in dysopiaOptions"
                    :key="index"
                    :label="item[1]"
                    >{{ item[0] }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="您目前的关系状态">
                <el-radio-group v-model="userInfoForm.relation" size="medium">
                  <el-radio-button
                    v-for="(item, index) in relateOptions"
                    :key="index"
                    :label="item[1]"
                    >{{ item[0] }}</el-radio-button
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="您现在的饥饿程度">
                <el-rate
                  v-model="userInfoForm.hunger"
                  :max="9"
                  :texts="rateConfig.texts"
                  :low-threshold="3"
                  :high-threshold="7"
                  :icon-classes="rateConfig.iconClasses"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                  void-icon-class="el-icon-tableware"
                  show-text
                  style="padding-top:10px;"
                >
                </el-rate>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div style="margin-top: 40px;" class="button-group">
        <el-button v-if="currentTabIndex > 0" type="primary" @click="handlePrev"
          >上一步</el-button
        >
        <el-button
          type="primary"
          @click="nextButtonHandler"
          :disabled="buttonDisabled"
          >{{ nextButtonText }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserInfo } from "@/interfaces/user";
import { Words, Images } from "@/data";
import { TYPES } from "@/store/mutations";

interface RateConfig {
  texts: string[];
  iconClasses: string[];
}

@Component({})
export default class Welcome extends Vue {
  // config
  private tabs: string[] = ["welcome", "intro", "form"];
  private images = Images;
  private dysopiaOptions = [
    ["否", "none"],
    ["红色盲", "red_all"],
    ["绿色盲", "green_all"],
    ["蓝黄色盲", "blue_yellow_all"],
    ["全色盲", "all"],
    ["全色弱", "all_weak"],
    ["红色弱", "red_weak"],
    ["绿色弱", "green_weak"],
    ["蓝黄色弱", "blue_yellow_weak"]
  ];
  private eduOptions = [
    ["mid", "初中"],
    ["sen", "高中"],
    ["bachelor", "本科"],
    ["graduate", "硕士"],
    ["doctor", "博士"]
  ];
  private relateOptions = [
    ["单身", "single"],
    ["恋爱", "loved"],
    ["订婚", "engaged"],
    ["结婚", "married"],
    ["分手", "broke"],
    ["离婚", "divorced"],
    ["其它", "other"]
  ];
  private words = Words;
  private rateConfig: RateConfig = {
    texts: [
      "非常饿",
      "很饿",
      "有点饿",
      "不太饿",
      "一般",
      "不太饱",
      "有点饱",
      "很饱",
      "非常饱"
    ],
    iconClasses: ["el-icon-goblet", "el-icon-goblet-full", "el-icon-food"]
  };
  // page state
  private currentTabIndex = 0;
  private userFormName = "userBaiscForm";
  // user data
  private rate = 0;
  private welcomeStats = {
    readInstructionStart: 0,
    readInstructionEnd: 0,
    userInfoStart: 0,
    userInfoEnd: 0
  };
  private userInfoForm: UserInfo = {
    birthYear: "",
    gender: 2,
    edu: "",
    dysopia: "",
    relation: "",
    hunger: 0
  };

  get isValid() {
    if (!this.userInfoForm.birthYear) return false;
    if (this.userInfoForm.birthYear === "") return false;
    const year = parseInt(this.userInfoForm.birthYear);
    if (year < 1940 || year > 2015) return false;
    if (
      this.userInfoForm.gender === 2 ||
      this.userInfoForm.edu === "" ||
      this.userInfoForm.dysopia === "" ||
      this.userInfoForm.relation === "" ||
      this.userInfoForm.hunger === 0
    ) {
      return false;
    }
    return true;
  }

  get pageTitle() {
    if (this.isLastTab) {
      return "请填写您的基本信息 | 饮食内隐联想测验";
    }
    return "项目说明 | 饮食内隐联想测验";
  }

  get isLastTab() {
    return this.currentTabIndex === this.tabs.length - 1;
  }

  get buttonDisabled() {
    if (!this.isLastTab) return false;
    if (this.isValid) return false;
    return true;
  }

  get nextButtonHandler() {
    // handle next
    if (this.isLastTab) {
      return this.submitForm;
    }
    return this.handleNext;
  }

  get nextButtonText() {
    if (this.isLastTab) {
      return "提交信息并进入测验";
    }
    return "下一步";
  }

  created() {
    this.welcomeStats.readInstructionStart = Date.now();
  }

  handleTabLeave(toTabName: string) {
    if (
      toTabName === this.tabs[2] &&
      this.welcomeStats.readInstructionEnd === 0 &&
      this.welcomeStats.userInfoStart === 0
    ) {
      this.welcomeStats.readInstructionEnd = Date.now();
      this.welcomeStats.userInfoStart = Date.now();
    }
  }

  logUserStats() {
    this.$store.commit(TYPES.LOG_WELCOME_STATS, this.welcomeStats);
  }

  submitForm() {
    if (!this.isValid) return;
    this.$store.commit(TYPES.UPDATE_USER_INFO, this.userInfoForm);
    this.welcomeStats.userInfoEnd = Date.now();
    this.$store.commit(TYPES.LOG_WELCOME_STATS, this.welcomeStats);
    this.$router.push("/iat/main");
  }

  handleNext() {
    if (this.currentTabIndex < this.tabs.length - 1) {
      this.currentTabIndex++;
    }
  }

  handlePrev() {
    if (this.currentTabIndex > 0) {
      this.currentTabIndex--;
    }
  }
}
</script>

<style lang="less">
#welcome {
  padding-top: 60px;
  max-width: 900px;
  padding: 40px;
  margin: auto;
  .container {
    margin-bottom: 60px;
    text-align: left;
    p {
      text-indent: 2em;
      span.in {
        padding: 3px 8px;
        text-indent: 0;
        display: inline-block;
        border-radius: 5px;
        font-weight: 600;
        font-size: 14px;
        background-color: #409eff;
        color: white;
      }
      span {
        text-indent: 0;
      }
    }
    .el-form-item__label {
      width: 150px !important;
      text-align: left;
    }
  }
}
</style>
