const url = "data/members.json";
const container = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    container.innerHTML = "<p>Error loading members.</p>";
  }
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
    <img src="${member.image}" alt="${member.name} logo">
    <div class="member-info">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
    </div>
    `;

    container.appendChild(card);
  });
}

function setActiveButton(view) {
  gridBtn.classList.toggle("active", view === "grid");
  listBtn.classList.toggle("active", view === "list");
}

// Toggle views
gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
  setActiveButton("grid");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
  setActiveButton("list");
});

// Initialize
getMembers();