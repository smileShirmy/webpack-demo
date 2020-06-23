const {
  registerDemo,
  createDemoDir,
  createEntry,
  clearFile
} = require('./util');
const md = require('./config');

// 需要确保存在 app/demo 目录及 app/demo/index.ts 文件
createDemoDir();

module.exports = function(source) {
  const content = md.render(source);

  const startTag = '<!--ava-demo:';
  const startTagLen = startTag.length;
  const endTag = ':ava-demo-->';
  const endTagLen = endTag.length;

  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置
  const demoComponentInfos = []; // 所有 Demo 

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const demoInfo = registerDemo(commentContent, id, this)
    demoComponentInfos.push(demoInfo)
    
    output.push(`<template slot="source"><${demoInfo.componentName} /></template>`);

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

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
