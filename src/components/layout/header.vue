<template>
  <header class="app-header">
    前端基础库
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.app-header {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  padding: 0 40px;
  line-height: 72px;
  font-size: 24px;
  color: $theme;
  border-bottom: 1px solid $border-color;
  box-shadow: 0 0 5px $border-color;
  z-index: $--index-normal;
}
</style>