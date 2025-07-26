const hamButton = document.querySelector('.menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

    

let visits = localStorage.getItem("page_visits");
visits = visits ? parseInt(visits) + 1 : 1;

document.getElementById("counter").innerText = visits;

localStorage.setItem("page_visits", visits);

