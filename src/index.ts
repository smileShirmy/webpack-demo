import './assets/styles/index.less';

const btn = document.getElementById('btn') as HTMLElement;

btn.addEventListener('click', () => {
  console.log('abc');

  import('@/foo.ts').then(({ getPerson }) => {
    console.log(getPerson());
  });
});
