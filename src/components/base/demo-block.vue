<template>
  <div>
    <!-- 示例 -->
    <p class="demo">
      <slot name="source"></slot>
    </p>
    <section class="code-content" ref="meta" :style="{ height: codeHeight }">
      <!-- 示例说明 -->
      <div class="description-wrapper" v-if="$slots.default">
        <p class="description">
          <slot></slot>
        </p>
      </div>
      <!-- 源码 -->
      <p class="source-code">
        <slot name="highlight"></slot>
      </p>
    </section>
    <div class="scroll-handler" @click="isExpanded = !isExpanded">
      {{ isExpanded ? '隐藏代码' : '显示代码' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class DemoBlock extends Vue {
  isExpanded = false

  height = 0

  @Watch('isExpaneded')
  expandedChange(is: boolean) {
    if (is) {

    }
  }

  get codeHeight() {
    return this.isExpanded ? `${this.height}px` : '0px'
  }

  mounted() {
    const el = this.$refs.meta as HTMLDivElement
    const rect = el.getBoundingClientRect()
    this.height = rect.height
  }
}
</script>

<style lang="scss" scoped>
p, pre {
  margin: 0;
}

.demo {
  margin: 20px 0;
}

.code-content {
  overflow: hidden;
}

.description-wrapper {
  box-sizing: border-box;
  padding: 12px;
  background-color: #e9f0f8;

  .description {
    box-sizing: border-box;
    padding: 12px;
    background-color: #fff;
  }
}

.scroll-handler {
  user-select: none;
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: $theme;
  }
}
</style>
