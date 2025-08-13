let MENU_CACHE = [];
export async function loadMenu(){
  if(MENU_CACHE.length) return MENU_CACHE;
  const res = await fetch('data/menu.json');
  if(!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json(); MENU_CACHE = json.items; return MENU_CACHE;
}
export function renderMenu(state){
  const container = document.getElementById('cards');
  const q=(state.search||''); const region=(state.region||''); const spice=(state.spice===''?null:Number(state.spice));
  const onlyFavs = !!state.onlyFavs;
  const filtered = MENU_CACHE
    .filter(i => !region || i.region===region)
    .filter(i => spice===null || i.spice===spice)
    .filter(i => `${i.name} ${i.description}`.toLowerCase().includes(q))
    .filter(i => !onlyFavs || isFavorito(i.id))
    .slice(0,60);
  container.innerHTML = filtered.map(tplCard).join('');
  document.querySelectorAll('[data-id]').forEach(card => {
    card.addEventListener('click',(e)=>{ if(e.target.closest('.fav-btn')) return; showModal(Number(card.dataset.id)); });
  });
  document.querySelectorAll('.fav-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{ e.stopPropagation(); toggleFavorito(Number(btn.dataset.id)); renderMenu(state); });
  });
}
import { openModal } from './modal.js';
import { toggleFavorito, isFavorito } from './storage.js';
function tplCard(item){
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price);
  const isFav = isFavorito(item.id);
  const favChar = isFav ? '★' : '☆';
  const favBtnClass = 'fav-btn' + (isFav ? ' fav' : '');
  const cardClass = 'card' + (isFav ? ' fav' : '');
  return `
  <article class="${cardClass}" data-id="${item.id}" tabindex="0" role="button" aria-label="Ver detalles de ${item.name}">
    <figure><img loading="lazy" src="${item.image}" alt="${item.name}"></figure>
    <h3>${item.name}</h3>
    <p class="meta">${item.region} • Spice: ${['Mild','Medium','Hot'][item.spice]} • <span class="price">${price}</span></p>
    <button class="${favBtnClass}" data-id="${item.id}" aria-pressed="${isFav}" aria-label="Marcar como favorito">${favChar}</button>
  </article>`;
}
function showModal(id){
  const item = MENU_CACHE.find(it=>it.id===id); if(!item) return;
  const body = document.getElementById('modalBody');
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price);
  body.innerHTML = `<h3 style="margin-top:0">${item.name}</h3>
    <p><em>${item.region}</em> • Spice: ${['Mild','Medium','Hot'][item.spice]} • <strong>${price}</strong></p>
    <p>${item.description}</p>`;
  openModal();
}
