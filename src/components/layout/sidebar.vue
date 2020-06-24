<template>
  <aside class="app-sidebar">
    <div class="menu-wrapper">
      <router-link
        class="menu-item"
        v-for="(route, i) in menus"
        :key="i"
        :to="route.path"
      >
        {{route.meta.title}}
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { routes } from '@/router/index.ts';

@Component({})
export default class extends Vue {
  get menus() {
    return routes
  }
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  box-sizing: border-box;
  position: fixed;
  top: 72px;
  left: 0;
  width: 250px;
  height: calc(100vh - 72px);
  border-right: 1px solid $border-color;
  user-select: none;

  .menu-wrapper {
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 20px;

    .menu-item {
      display: inline-block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;

      &:hover {
        color: $theme;
      }
    }
  }

  .router-link-exact-active {
    color: $theme;
  }
}
</style>