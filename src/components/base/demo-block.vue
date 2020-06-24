<template>
  <div class="demo-block">
    <!-- 示例 -->
    <p class="demo">
      <slot name="source"></slot>
    </p>
    <section class="code-content" ref="meta">
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

  @Watch('isExpanded')
  expandedChange(is: boolean) {
    const el = this.$refs.meta as HTMLDivElement
    if (is) {
      el.style.height = `${this.height}px`
    } else {
      el.style.height = '0px'
    }
  }

  get codeHeight() {
    return this.isExpanded ? `${this.height}px` : '0px'
  }

  mounted() {
    const el = this.$refs.meta as HTMLDivElement
    const rect = el.getBoundingClientRect()
    this.height = rect.height + 40
    el.style.height = '0px'
  }
}
</script>

<style lang="scss" scoped>
.demo-block {
  margin: 30px 0;
  border: 1px solid #dee2e6;
  box-shadow: 2px 2px 30px #c7ccd7;
}

p, pre {
  margin: 0;
}

.demo {
  padding: 20px;
}

.code-content {
  box-sizing: border-box;
  overflow: hidden;
  transition: height .2s;
}

.description-wrapper {
  box-sizing: border-box;
  margin: 20px 20px 0;
  padding: 14px;
  background-color: #e9f0f8;

  .description {
    box-sizing: border-box;
    padding: 14px;
    background-color: #fff;
  }
}

.source-code {
  margin: 0 20px 20px;
}

.scroll-handler {
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-top: 1px solid $border-color;
  cursor: pointer;
  user-select: none;
  transition: all .2s;

  &:hover {
    color: $theme;
    background-color: #f9fafc;
  }
}
</style>
