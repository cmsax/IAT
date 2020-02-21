<template>
  <div id="result">
    <h2>Thanks</h2>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class Result extends Vue {
  mounted() {
    if (!this.$store.state.finished) {
      this.$router.push("/iat/welcome");
    }
  }
}
</script>