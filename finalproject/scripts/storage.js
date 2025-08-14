const KEY='sabor:favoritos';

export function getFavoritos(){ try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; } }

export function toggleFavorito(id){
  const favs=getFavoritos(); const i=favs.indexOf(id);
  if(i>=0) favs.splice(i,1); else favs.push(id);
  localStorage.setItem(KEY, JSON.stringify(favs)); return favs;
}

export function isFavorito(id){ return getFavoritos().includes(id); }
