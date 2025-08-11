const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
navLinks.classList.toggle('show');
});

    
function setVisitMessage(){
  const box = document.getElementById('visit-banner');
  const now = Date.now();
  const last = Number(localStorage.getItem('lastVisit'));
  let message = '';
  if(!last){
    message = 'Welcome! Let us know if you have any questions.';
  }else{
    const diffMs = now - last;
    const days = Math.floor(diffMs / (1000*60*60*24));
    if(days < 1){
      message = 'Back so soon! Awesome!';
    }else{
      message = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }
  box.textContent = message;
  localStorage.setItem('lastVisit', String(now));
}

    
async function loadCards() {
  const container = document.getElementById('cards-container');
  container.innerHTML = '<p style="color:var(--muted);margin:12px">Loading places…</p>';
  try{
    const res = await fetch('data/items.json');
    if(!res.ok) throw new Error(`HTTP ${res.status} fetching items.json`);
    const data = await res.json();

    container.innerHTML = '';
    const placeholder = 'https://picsum.photos/640/400?grayscale';

    data.forEach((place, index) => {
      const article = document.createElement('article');
      article.classList.add('card');
      article.id = `card-${String.fromCharCode(97 + index)}`;

      article.innerHTML = `
        <h2>${place.name || 'Unknown Place'}</h2>
        <figure>
          <img loading=\"lazy\" src=\"${place.image || placeholder}\" alt=\"${place.name || 'Place image'}\">
        </figure>
        <p>${place.description || ''}</p>
        <address>${place.address || ''}</address>
        <div class=\"cta\"><button type=\"button\" aria-label=\"Learn more about ${place.name || 'this place'}\">Learn More</button></div>
      `;
      container.appendChild(article);
    });
  }catch(err){
    console.error('Failed to load items.json', err);
    container.innerHTML = `<p style=\"color:#b91c1c;background:#fee2e2;border:1px solid #fecaca;padding:12px;border-radius:8px\">Could not load <code>items.json</code>. Check the file path (expected at <code>/data/items.json</code> relative to this HTML) and that you are running a local server.</p>`;
  }
}

setVisitMessage();
loadCards();