const q=new URLSearchParams(location.search);
const v=k=>q.get(k)||'—';

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

document.getElementById('f').textContent=v('first');
document.getElementById('l').textContent=v('last');
document.getElementById('e').textContent=v('email');
document.getElementById('m').textContent=v('phone');
document.getElementById('o').textContent=v('orgname');

const ts=q.get('timestamp');

document.getElementById('t').textContent= ts? new Date(ts).toLocaleString(): '—';