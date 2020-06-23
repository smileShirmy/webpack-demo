<template>
  <div class="scss-test">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {

}
</script>

<style lang="scss" scoped>
.scss-test {
  color: steelblue;
}
</style>