async function loadSpotlights() {
  const res = await fetch("data/members.json");
  const data = await res.json();

  const goldSilver = data.filter(m =>
    m.membershipLevel === 2 || m.membershipLevel === 3
  );

  const shuffled = goldSilver.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

  const container = document.getElementById("spotlight-container");
  container.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <div class="card-header">
        <h3>${member.name}</h3>
        <p class="tagline">${member.category || "Business Tag Line"}</p>
      </div>
      <div class="card-body">
        <img src="${member.image}" alt="${member.name} logo">
        <div class="card-info">
          <p><strong>EMAIL:</strong> <a href="mailto:info@${member.website.replace(/^https?:\/\//, '')}">info@${member.website.replace(/^https?:\/\//, '')}</a></p>
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

loadSpotlights();
