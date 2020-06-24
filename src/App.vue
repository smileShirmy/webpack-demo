<template>
  <div class="app">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <article class="app-content-wrapper markdown-style">
      <div class="app-content markdown-style">
        <router-view />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/layout/header.vue';
import AppSidebar from '@/components/layout/sidebar.vue';

@Component({
  components: {
    AppHeader,
    AppSidebar
  }
})
export default class App extends Vue {

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
    padding-bottom: 100px;
  }
}
</style>