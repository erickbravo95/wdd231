export function initNav(){
  const btn = document.getElementById('hamburger');
  const list = document.querySelector('.navlinks');
  if(!btn || !list) return;
  btn.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}
export function initShortcuts(){
  document.addEventListener('keydown', (e) => {
    if(e.key === '/' && document.getElementById('search')){ e.preventDefault(); document.getElementById('search').focus(); }
  });
}
