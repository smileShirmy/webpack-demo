<template>
  <div>
    <p>
      <slot name="source"></slot>
    </p>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class DemoBlock extends Vue {

}
</script>
