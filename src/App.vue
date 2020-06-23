<template>
  <div class="app">
    <app-header></app-header>
    <main class="app-main">
      <app-sidebar></app-sidebar>
      <article class="app-content-wrapper markdown-style">
        <div class="app-content markdown-style">
          <router-view />
        </div>
      </article>
    </main>
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
.app-main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100vh - 72px);
}

.app-content-wrapper {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: calc(100% - 250px);

  .app-content {
    width: 1000px;
  }
}
</style>