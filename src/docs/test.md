# Test

这个文档好好看

:::demo 这是 Demo 的说明
```vue
<template>
  <div class="demo-scss">
    {{message}}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

function func() {
  console.log('func')
}

@Component({})
export default class extends Vue {
  message = 'test123'
}
</script>
```
:::
