<template>
  <div class="app">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <article class="app-content-wrapper markdown-style" ref="scrollBox">
      <div class="app-content markdown-style">
        <router-view />
        <footer class="app-footer">
          <span>develop &amp; design by Shirmy</span>
        </footer>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AppHeader from '@/components/layout/header.vue';
import AppSidebar from '@/components/layout/sidebar.vue';
import { Route } from 'vue-router';

function renderAnchorHref() {
  const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a');
  const basePath = location.href.split('#').splice(0, 2).join('#');

  ;[].slice.call(anchors).forEach((a: HTMLLinkElement) => {
    const href = a.getAttribute('href');
    a.href = basePath + href;
  });
}

@Component({
  components: {
    AppHeader,
    AppSidebar
  }
})
export default class App extends Vue {
  scrollBox: any;

  @Watch('$route', {
    immediate: true
  })
  changeRoute(to: Route, from: Route) {
    if (!from || to.path !== from.path) {
      this.$nextTick(() => {
        renderAnchorHref()
      })
      return
    }
    if (to.hash) {
      this.goAnchor()
    }
  }

  mounted() {
    this.scrollBox = this.$refs.scrollBox as HTMLDivElement
  }

  goAnchor() {
    const hrefs = location.href.match(/#/g) || []
    if (hrefs.length > 1) {
      const anchor = location.href.match(/#[^#]+$/g);
      if (!anchor) return;
      const elm = document.querySelector(anchor[0]) as HTMLLinkElement;
      if (!elm) return;

      setTimeout(() => {
        this.scrollBox.scrollTop = elm.offsetTop;
      }, 50);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content-wrapper {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: fixed;
  top: 72px;
  left: 250px;
  width: calc(100% - 250px);
  height: calc(100vh - 72px);
  overflow-y: auto;

  .app-content {
    width: 1000px;
  }

  .ava-doc {
    min-height: calc(100vh - 220px);
  }

  .app-footer {
    font-size: 14px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #999;
  }
}
</style>