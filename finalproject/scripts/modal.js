export function setupModal(){
  const dialog = document.getElementById('dishModal'); if(!dialog) return;
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if(e.target === dialog) dialog.close(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && dialog.open) dialog.close(); });
}
export function openModal(){ document.getElementById('dishModal').showModal(); }
