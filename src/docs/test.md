# Test

当前版本：`1.1.2`

:::log
1.1.2

1. `A`: 新增
2. `U`: 更新
3. `U`: 优化
4. `F`: 修复

1.1.1

1. `A`: 新增 图片组件
2. `U`: 更新 图片组件
3. `U`: 优化 图片组件
4. `F`: 修复 图片太大的问题

1.1.0

1. `A`: 新增 头部组件
:::

## 这是一个测试

这个文档好好看

:::demo 这是 Demo 的说明 `Code`
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

## 这是标题二

这是标题二下面的内容

## Attributes

| 参数            | 说明                                                                   | 类型     | 可选值 | 默认值                              |
| --------------- | ---------------------------------------------------------------------- | -------- | ------ | ----------------------------------- |
| token           | 上传时需要携带的 token                                                 | string   | -      | -                                   |
| uri             | 上传 URI                                                               | string   | -      | 'storage-service/webservice/upload' |
| allowExtensions | 允许上传的文件类型                                                     | string[] | -      | -                                   |
| isUseWhiteList  | 是否使用默认的白名单类型, 如果存在 allowExtensions 会禁用掉 默认白名单 | boolean  | -      | true                                |

## Function Attributes

| 参数         | 说明         | 类型     | 回调参数                                                |
| ------------ | ------------ | -------- | ------------------------------------------------------- |
| beforeUpload | 上传前回调   | Function | {name: string, size: number, originName: string }       |
| onProcess    | 上传进度回调 | Function | number                                                  |
| onSuccess    | 上传成功回调 | Function | response: any <br/>message: string<br/>fileName: string |
| onError      | 上传失败回调 | Function | {status: number, message: string, fileName: string }    |

## Methods

| 名称  | 说明         | 类型     | 请求参数 |
| ----- | ------------ | -------- | -------- |
| abort | 中断上传方法 | Function | -        |
