const fs = require('fs-extra');
const path = require('path');

const IMPORT_TEMPLATE = `{{import}}

const components: { [propName: string]: any} = {
  {{names}}
}

export default components;`;

const demoDir = path.resolve(__dirname, '../../src/demo')

function createDemoDir() {
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir)
  }
  const index = path.join(demoDir, 'index.ts')
  fs.writeFileSync(index, 'export default {} as { [prop: string]: any }')
}

function registerDemo(component, id, filename) {
  componentDir = path.join(demoDir, filename)
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir)
  }

  const componentFile = path.join(componentDir, `${id}.vue`)
  fs.writeFileSync(componentFile, component)

  return {
    id,
    moduleName: filename,
    componentName: `ava-demo-${filename}${id}`
  }
}

function createEntry(demoComponentInfos = []) {
  const importNames = []
  const componentNames = []
  demoComponentInfos.forEach(({ id, moduleName, componentName }) => {
    const name = firstToUpper(came(componentName))
    importNames.push(`import ${name} from './${moduleName}/${id}.vue'`)
    componentNames.push(name)
  })

  const template = IMPORT_TEMPLATE
    .replace('{{import}}', importNames.join('\n'))
    .replace('{{names}}', componentNames.join(',\n'))

  const entryFile = path.join(demoDir, 'index.ts')
  fs.writeFileSync(entryFile, template)
}

// 清空没用的文件
function clearFile(demoComponentInfos = []) {
  if (!demoComponentInfos.length) {
    // 如果没有任何组件清空所有目录
    const dirs = fs.readdirSync(demoDir)
    dirs.filter(dir => !dir.includes('.')).forEach(dir => {
      fs.removeSync(path.join(demoDir, dir))
    })
    return
  }

  const moduleComponentMap = demoComponentInfos.reduce((pre, cur) => {
    const name = `${cur.id}.vue`
    const moduleName = cur.moduleName 
    if (pre[moduleName]) {
      pre[moduleName].push(name)
    } else {
      pre[moduleName] = [name]
    }
    return pre
  }, {})

  const dirs = fs.readdirSync(demoDir)
  dirs.forEach(dir => {
    // 找到所有 demo 的目录
    if (!dir.includes('.')) {
      const components = moduleComponentMap[dir]
      // 如果有找到相应的 demo 目录，再检查文件
      if (components) {
        const moduleDirPath = path.join(demoDir, dir)
        const componentFiles = fs.readdirSync(moduleDirPath)
        // 遍历目录下的所有文件
        componentFiles.forEach(file => {
          // 如果不存在则删除
          if (!components.includes(file)) {
            fs.removeSync(path.join(moduleDirPath, file))
          }
        })
      } else {
        // 如果找不到对应的文件夹则删除
        fs.removeSync(path.join(demoDir, dir))
      }
    }
  })
}

// 转为驼峰命名
const came = (str) =>
  `${str}`.replace(/-\D/g, (match) => match.charAt(1).toUpperCase());

// 首字母大写
const firstToUpper = (str) => str.replace(str[0], str[0].toUpperCase());

module.exports = {
  registerDemo,
  createDemoDir,
  createEntry,
  clearFile
}