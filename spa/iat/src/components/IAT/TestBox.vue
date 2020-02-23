<template>
  <div class="iat-box">
    <el-row type="flex" justify="space-between">
      <el-col>
        <el-row class="indicator">
          按下
          <el-button
            style="padding: 8px 10px; font-size:14px;"
            class="button"
            size="mini"
            circle
            >e</el-button
          >表示
        </el-row>
        <el-row>
          <h2>{{ positiveTitle }}</h2>
        </el-row>
      </el-col>
      <el-col>
        <el-row class="indicator">
          按下
          <el-button
            style="padding: 8px 12px; font-size:14px;"
            class="button"
            size="mini"
            circle
            >i</el-button
          >表示
        </el-row>
        <el-row>
          <h2>{{ negativeTitle }}</h2>
        </el-row>
      </el-col>
    </el-row>

    <div class="image-or-instruction">
      <!-- Active content -->
      <el-row v-if="active">
        <div v-if="testCase.isImage" class="image">
          <el-image
            :src="testCase.imageURL"
            fit="contain"
            style="height: 300px;"
            :alt="testCase.testDescription"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <h4>{{ testCase.testDescription }}</h4>
        </div>
        <div v-else>
          <h1>{{ testCase.testDescription }}</h1>
        </div>
      </el-row>

      <!-- Instructions -->
      <el-row v-else class="instruction" justify="center">
        <el-col>
          <h3>{{ optionalInstruction.title }}</h3>
          <el-row justify="center" type="flex">
            <el-col :span="20">
              <ul style="text-align:left; list-style:none;">
                <li
                  style="display: block; min-height:10px; margin:5px 0;"
                  v-for="(cmd, index) in optionalInstruction.cmds"
                  :key="index"
                >
                  {{ cmd }}
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-row class="error">
      <h2 v-if="!valid">
        <i class="el-icon-close"></i>
      </h2>
    </el-row>
    <el-row class="instruction">
      <h4>
        {{
          imageLoaded
            ? helpInfo
            : "图片正在预加载：" + imageLoadedPercentage + "%"
        }}
      </h4>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleTest } from "@/interfaces/test";
import { Instruction } from "@/interfaces/instruction";
import { UserLeaveSpan } from "@/interfaces/result";
import { Images } from "@/data";
import { KEYS, ValidMap } from "@/constant";
import { TYPES } from "../../store/mutations";

@Component
export default class TestBox extends Vue {
  // indicates whether instruction or test
  @Prop() private active!: boolean;
  @Prop() private testCase?: SingleTest;
  @Prop() private optionalInstruction?: Instruction;
  @Prop() private positiveTitle!: string;
  @Prop() private negativeTitle!: string;
  @Prop() private currentTestPackIndex!: number;

  private images = Images;
  private imageLoadedCount = 0;

  // milliseconds
  private lastTime!: number;
  private valid = true;
  private userLeaveSpan: UserLeaveSpan = {
    leaveStart: 0,
    leaveEnd: 0,
    currentTest: null,
    currentTestPackIndex: 0,
    notIntro: false
  };

  get allImages() {
    return [
      ...this.images.warmImages,
      ...this.images.coldImages,
      this.images.coldImageIntro,
      this.images.warmImageIntro
    ];
  }

  get imageLoadedPercentage() {
    return Math.floor((this.imageLoadedCount / this.allImages.length) * 100);
  }

  get imageLoaded() {
    return this.imageLoadedCount === this.allImages.length;
  }

  resetLeaveSpan() {
    this.userLeaveSpan = {
      leaveStart: 0,
      leaveEnd: 0,
      currentTest: null,
      currentTestPackIndex: 0,
      notIntro: false
    };
  }

  preloadImages() {
    for (const imgSrc of this.allImages) {
      const tempImage = new Image();
      tempImage.src = imgSrc;
      tempImage.onload = () => {
        this.imageLoadedCount++;
      };
    }
  }

  created() {
    this.preloadImages();
  }

  mounted() {
    // 确保这里只绑定了一次
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("visibilitychange", this.handleUserLeave);
    this.lastTime = Date.now();
  }

  beforeDestroy() {
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("visibilitychange", this.handleUserLeave);
  }

  get helpInfo() {
    // if (this.active && !this.valid) {
    //   const isCurrentPositive =
    //     this.testCase!.positiveOrNegative === "positive";
    //   return (
    //     "当前是" +
    //     (isCurrentPositive ? "积极的" : "消极的") +
    //     "，请按 " +
    //     (isCurrentPositive ? "左" : "右") +
    //     "方向键继续。"
    //   );
    // }
    if (!this.active) {
      return "当您阅读完说明后，如果准备好了，请按 空格键 继续测验";
    }
    return "";
  }

  tick(): number {
    const elapsed = Date.now() - this.lastTime;
    this.lastTime = Date.now();
    return elapsed;
  }

  handleUserLeave() {
    if (document.hidden) {
      console.log("user leave");
      this.userLeaveSpan.leaveStart = Date.now();
    } else {
      console.log("user come back");
      if (this.userLeaveSpan.leaveStart != 0) {
        this.userLeaveSpan.leaveEnd = Date.now();
        this.userLeaveSpan.currentTest = this.testCase as SingleTest;
        this.userLeaveSpan.currentTestPackIndex = this.currentTestPackIndex;
        this.userLeaveSpan.notIntro = this.active;
        this.$store.commit(TYPES.LOG_USER_LEAVE, this.userLeaveSpan);
        this.resetLeaveSpan();
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    if (!this.imageLoaded) {
      return;
    }
    if (!this.active) {
      if (event.keyCode === KEYS.continue) {
        // continue
        this.$emit("continue");
      }
    } else if (
      event.keyCode === KEYS.positive ||
      event.keyCode === KEYS.negative
    ) {
      // choose
      this.valid =
        this.testCase!.positiveOrNegative === ValidMap[event.keyCode];
      this.$emit("choosePositiveOrNegative", {
        keyCode: event.keyCode,
        elapsed: this.tick(),
        test: this.testCase,
        valid: this.valid
      });
    }
  }
}
</script>

<style lang="less">
.iat-box {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  border: 1px solid pink;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  .indicator {
    font-weight: 800;
    font-size: 10px;
    .button {
      background-color: #303133;
      color: white;
      margin-right: 5px;
    }
  }
  h1 {
    color: black;
  }
  h2 {
    color: red;
  }

  .image-or-instruction {
    margin: 40px 0 10px 0;
    height: 300px;
  }

  h2 {
    font-size: 800;
    text-transform: capitalize;
  }

  .error {
    color: red;
    height: 50px;
    font-size: 40px;
    h2 {
      margin: 0;
      padding: 0;
    }
  }

  .instruction {
    margin-top: 10px;
    text-align: center;
    width: auto;
  }
}
</style>
