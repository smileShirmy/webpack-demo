<template>
  <div>
    <div ref="logWrapper" v-show="false">
      <slot></slot>
    </div>
    <el-button class="log-btn" type="primary" @click="showLog">版本日志</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Notification } from 'element-ui'

@Component({})
export default class LogBlock extends Vue {
  notification: any;

  showLog() {
    if (this.notification) {
      this.notification.close()
      this.notification = null
      return
    }
    const logWrapper = this.$refs.logWrapper as HTMLDivElement
    if (logWrapper) {
      const html = logWrapper.innerHTML
      this.notification = this.$notify({
        title: '版本日志',
        dangerouslyUseHTMLString: true,
        duration: 10000,
        message: html,
        customClass: 'log-notification',
        onClose: () => {
          this.notification = null
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.log-btn {
  padding: 8px 16px;
  border-radius: 2px;
  background-color: $theme;
  border-color: $theme;

  &:hover,
  &:focus {
    background: $theme-deep;
    border-color: $theme-deep;
  }
}

ul, ol {
  width: 100%;
  margin-top: 10px;
  padding-left: 20px;
  max-height: 70vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none
  }
}
</style>