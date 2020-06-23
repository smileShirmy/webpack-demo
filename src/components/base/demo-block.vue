<template>
  <div>
    <!-- 示例 -->
    <p>
      <slot name="source"></slot>
    </p>
    <!-- 示例说明 -->
    <p>
      <slot></slot>
    </p>
    <!-- 源码 -->
    <p>
      <slot name="highlight"></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class DemoBlock extends Vue {

}
</script>
