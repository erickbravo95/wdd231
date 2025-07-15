const modeButton = document.querySelector("#darkbutton");
const main = document.querySelector("main");
const card1 = document.querySelector("#card1");

modeButton.addEventListener("click", () => {
	if (modeButton.textContent.includes("🕶️")) {
		main.style.background = "#000";
		main.style.color = "#fff";
		modeButton.textContent = "🔆";
	} else { 
		/*normal*/
		main.style.background = "#fff";
		main.style.color = "#000";
		modeButton.textContent = "🕶️";
	}
});