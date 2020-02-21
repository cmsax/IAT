<template>
  <div class="iat-box">
    <el-row type="flex" justify="space-between">
      <el-col>
        <el-row class="indicator">
          Press
          <el-button class="button" size="mini" icon="el-icon-back" circle></el-button>for
        </el-row>
        <el-row>
          <h2>{{ positiveTitle }}</h2>
        </el-row>
      </el-col>
      <el-col>
        <el-row class="indicator">
          Press
          <el-button class="button" size="mini" icon="el-icon-right" circle></el-button>for
        </el-row>
        <el-row>
          <h2>{{ negativeTitle }}</h2>
        </el-row>
      </el-col>
    </el-row>

    <div class="image-or-instruction">
      <el-row v-if="active">
        <div v-if="testCase.isImage" class="image">
          <el-image
            :src="testCase.imageURL"
            fit="cover"
            style="width: 300px;"
            :alt="testCase.testDescription"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <h4>{{ testCase.testDescription }}</h4>
        </div>
        <div v-else>
          <h2>{{ testCase.testDescription }}</h2>
        </div>
      </el-row>
      <el-row v-else class="instruction" justify="center">
        <el-col>
          <h3>{{ optionalInstruction.title }}</h3>
          <ul>
            <li v-for="(cmd, index) in optionalInstruction.cmds" :key="index">{{ cmd }}</li>
          </ul>
        </el-col>
      </el-row>
    </div>

    <el-row class="error">
      <h2 v-if="!valid">
        <i class="el-icon-close"></i>
      </h2>
    </el-row>
    <el-row class="instruction">
      <h4>{{ helpInfo }}</h4>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleTest } from "@/interfaces/test";
import { Instruction } from "@/interfaces/instruction";
import { KEYS, ValidMap } from "@/constant";

@Component
export default class TestBox extends Vue {
  // indicates whether instruction or test
  @Prop() private active!: boolean;
  @Prop() private testCase?: SingleTest;
  @Prop() private optionalInstruction?: Instruction;
  @Prop() private positiveTitle!: string;
  @Prop() private negativeTitle!: string;

  // milliseconds
  private lastTime!: number;
  private valid = true;

  mounted() {
    // 确保这里只绑定了一次
    window.addEventListener("keyup", this.handleKeyUp);
    this.lastTime = Date.now();
  }

  beforeDestroy() {
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  get helpInfo() {
    if (this.active && !this.valid) {
      const isCurrentPositive =
        this.testCase!.positiveOrNegative === "positive";
      return (
        "当前是" +
        (isCurrentPositive ? "积极的" : "消极的") +
        "，请按 " +
        (isCurrentPositive ? "左" : "右") +
        "方向键继续。"
      );
    }
    if (!this.active) {
      return "请按空格继续";
    }
    return "";
  }

  tick(): number {
    const elapsed = Date.now() - this.lastTime;
    this.lastTime = Date.now();
    return elapsed;
  }

  updated() {
    console.log("current test:", this.testCase);
  }

  handleKeyUp(event: KeyboardEvent) {
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

  h2 {
    color: red;
  }

  .image-or-instruction {
    margin: 40px 0 10px 0;
    height: 300px;
  }

  h2 {
    color: red;
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
