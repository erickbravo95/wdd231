  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
    document.getElementById('timestamp').value = new Date().toISOString();

    document.querySelectorAll('[data-open]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const id = a.getAttribute('data-open');
        const dlg = document.querySelector(id);
        if(dlg) dlg.showModal();
      });
    });

    document.querySelectorAll('dialog .closeBtn').forEach(btn=>{
      btn.addEventListener('click', ()=> btn.closest('dialog').close());
    });