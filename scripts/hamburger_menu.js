const hamButton = document.querySelector('#hmenu');
const navigation = document.querySelector('#animateme');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});