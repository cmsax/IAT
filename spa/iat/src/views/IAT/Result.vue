<template>
  <div id="result">
    <h2>Done, thanks!</h2>
    <el-button @click="handleRetry">Retry</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// import { getDefaultState } from "@/store/state";
import { TYPES } from "@/store/mutations";
@Component({})
export default class Result extends Vue {
  mounted() {
    if (!this.$store.state.finished) {
      this.$router.push("/iat/welcome");
    }
  }

  handleRetry() {
    this.$store.commit(TYPES.RESET);
    this.$router.push("/iat/welcome");
  }
}
</script>
