const updateBodyPadding = () => {
  // フッターの高さを取得
  const footerHeight = document.querySelector('.l-footer').clientHeight;
  if (!footerHeight) return;

  // bodyのpadding-bottomにフッターの高さを指定
  document.body.style.paddingBottom = `${footerHeight}px`;
};

const setBodyPadding = () => {
  // load時とresize時にupdateBodyPadding関数を実行
  window.addEventListener('load', updateBodyPadding);
  window.addEventListener('resize', updateBodyPadding);
};

export default setBodyPadding;
