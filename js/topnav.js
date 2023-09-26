const topnav = document.querySelector("#myTopnav");

function toggleNav() {
	if (topnav.classList.contains("responsive")) {
		topnav.classList.remove("responsive");
		return;
	}
	topnav.classList.add("responsive");
}

/** For the responsive nav */
function handleEditNavClick(e) {
	e.preventDefault();
	toggleNav();
}

/**
 * Initialize topnav
 */
export function initTopnav() {
	document
		.querySelector("#nav-btn")
		.addEventListener("click", handleEditNavClick);
}
