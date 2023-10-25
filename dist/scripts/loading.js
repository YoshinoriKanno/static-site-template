function noscroll(e) {
  e.preventDefault();
}
document.addEventListener('touchmove', noscroll, { passive: false });
document.addEventListener('wheel', noscroll, { passive: false });
window.onload = function () {
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  document.removeEventListener('touchmove', noscroll);
  document.removeEventListener('wheel', noscroll);
};
