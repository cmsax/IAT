<template>
  <div id="test-container">
    <test-box
      :active="alreadyReadInstructions"
      :test-case="currentTestCase"
      :positive-title="currentTestPack.positiveTitle"
      :negative-title="currentTestPack.negativeTitle"
      :optional-instruction="currentTestPack.instruction"
      @choosePositiveOrNegative="handleChoose"
      @continue="handleContinue"
    ></test-box>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { TestPack } from "@/interfaces/test";
import { ChooseEventPayload } from "@/interfaces/payload";
import { ACTIONS } from "@/store/actions";
import { TYPES } from "@/store/mutations";
import { TestPacks } from "@/data";
import TestBox from "@/components/IAT/TestBox.vue";

@Component({ components: { TestBox } })
export default class Container extends Vue {
  private currentTestIndex = 0;
  private currentTestPackIndex = 0;
  private testPacks: TestPack[] = TestPacks;
  private finishedTests: ChooseEventPayload[] = [];
  private alreadyReadInstructions = 0;

  get currentTestPack() {
    return this.testPacks[this.currentTestPackIndex];
  }

  get currentTestCase() {
    return this.currentTestPack.testCases[this.currentTestIndex];
  }

  get active() {
    return this.alreadyReadInstructions > 0;
  }

  created() {
    document.title = "测试中";
  }

  handleContinue() {
    this.alreadyReadInstructions++;
  }

  finishTestPack(testPack: TestPack, finishedTests: ChooseEventPayload[]) {
    this.$store.commit(TYPES.FINISH_TEST_PACK, {
      testPack,
      finishedTests
    });
  }

  handleChoose(payload: ChooseEventPayload) {
    if (!payload.valid) return;
    this.finishedTests.push(payload);
    if (
      this.currentTestIndex <
      this.testPacks[this.currentTestPackIndex].testCases.length - 1
    ) {
      // in current test pack
      this.currentTestIndex++;
    } else if (this.currentTestPackIndex < this.testPacks.length - 1) {
      this.finishTestPack(this.currentTestPack, this.finishedTests);
      this.finishedTests = [];
      // in next test pack
      this.alreadyReadInstructions = 0;
      this.currentTestPackIndex++;
      this.currentTestIndex = 0;
    } else {
      this.finishTestPack(this.currentTestPack, this.finishedTests);
      // done test packs
      this.$store.dispatch(ACTIONS.SUBMIT_RESULT_ASYNC).then(res => {
        // TODO check res
        this.$router.push("/iat/result");
      });
    }
  }
}
</script>

<style lang="less">
#test-container {
  padding-top: 60px;
}
</style>
