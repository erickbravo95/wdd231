import { initNav, initShortcuts } from './ui.js';
import { loadMenu, renderMenu } from './data.js';
import { setupModal } from './modal.js';

initNav(); 
initShortcuts();

const cards = document.getElementById('cards');

if(cards){
  const state = { search:'', region:'', spice:'', onlyFavs:false };
  const selectRegion=document.getElementById('region');
  const selectSpice=document.getElementById('spice');
  const search=document.getElementById('search');
  const favToggle=document.createElement('button');
  favToggle.textContent='Show favorites'; favToggle.className='cta';
  document.querySelector('.controls').appendChild(favToggle);
  favToggle.addEventListener('click',()=>{ state.onlyFavs=!state.onlyFavs; favToggle.textContent=state.onlyFavs?'Show all':'Show favorites'; renderMenu(state); });
  (async()=>{
    try{
      const data = await loadMenu();
      [...new Set(data.map(d=>d.region))].sort().forEach(r=>{ const opt=document.createElement('option'); opt.value=r; opt.textContent=r; selectRegion.appendChild(opt); });
      const apply=()=>{ state.search=search.value.trim().toLowerCase(); state.region=selectRegion.value; state.spice=selectSpice.value; renderMenu(state); };
      ['input','change'].forEach(evt=>{ search.addEventListener(evt,apply); selectRegion.addEventListener(evt,apply); selectSpice.addEventListener(evt,apply); });
      renderMenu(state); setupModal();
    }catch(err){ cards.innerHTML = `<p class="card" style="padding:1rem">Error loading menu. Please try again later.</p>`; console.error(err); }
  })();
}


const el = document.getElementById('statusLocal');
if(el){
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes()/60;
  const abierto = (day >= 1 && day <= 6) && (hour >= 11 && hour < 22);
  el.textContent = abierto ? 'Open now' : 'Closed now';
  if(!abierto) el.classList.add('closed');
}

