const {
  registerDemo,
  createDemoDir,
  createEntry,
  clearFile
} = require('./util');
const md = require('./config');
const path = require('path');

// 需要确保存在 app/demo 目录及 app/demo/index.ts 文件
createDemoDir();

// 缓存所有的 demo，用于统一管理
let demoComponentInfos = []

// 缓存 demo 并去重
function storeDemos(demoInfos = [], filename) {
  // 如果当前文件没有 demo 则清除之
  if (demoInfos.length === 0) {
    demoComponentInfos = demoComponentInfos.filter(v => v.moduleName !== filename)
    return
  }
  demoComponentInfos.push(...demoInfos)
  const stringifyDemos = demoComponentInfos.map(info => JSON.stringify(info)) 
  demoComponentInfos = Array.from(new Set(stringifyDemos)).map(info => JSON.parse(info))
}

module.exports = function(source) {
  const content = md.render(source);

  const startTag = '<!--ava-demo:';
  const startTagLen = startTag.length;
  const endTag = ':ava-demo-->';
  const endTagLen = endTag.length;

  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置
  const demoInfos = [] // 当前文件的 demo

  const filename = path.basename(this.resource).replace(/\..*/, '')

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const demoInfo = registerDemo(commentContent, id, filename)
    demoInfos.push(demoInfo)
    
    output.push(`<template slot="source"><${demoInfo.componentName} /></template>`);

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 缓存 demo
  storeDemos(demoInfos, filename)

  clearFile(demoComponentInfos)

  createEntry(demoComponentInfos)

  output.push(content.slice(start));
  return `
    <template>
      <section class="content ava-doc">
        ${output.join('')}
      </section>
    </template>
  `;
};
