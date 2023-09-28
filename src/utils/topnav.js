const topnav = document.querySelector("#myTopnav");

function editNav() {
	if (topnav.classList.contains("responsive")) {
		topnav.classList.remove("responsive");
		return;
	}
	topnav.classList.add("responsive");
}

/** @param {Event} e */
function onEditNavClick(e) {
	e.preventDefault();
	editNav();
}

export function toggleMobileTopnav() {
	if (topnav.classList.contains("open-modal")) {
		topnav.classList.remove("open-modal");
		return;
	}

	topnav.classList.add("open-modal");
}

export function topnavInit() {
	document
		.querySelector("#nav-btn")
		.addEventListener("click", onEditNavClick);
}
