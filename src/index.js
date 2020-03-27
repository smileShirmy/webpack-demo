import '@/assets/styles/index.less';

const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
  // 异步加载
  import('@/foo').then((res) => {
    res.foo()
  })
})
