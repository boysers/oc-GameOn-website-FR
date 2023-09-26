// DOM Elements
const modalbg = document.querySelector(".bground");
const topnav = document.querySelector("#myTopnav");

// DOM elements for form success message.
// 				pour le message de succès du formulaire.
const contentElement = document.querySelector(".content");
const successElements = document.querySelectorAll(".success-el");

// The modal registration form.
// Le formulaire d'inscription de la modal.
const signupForm = document.querySelector("#signup-form");

/** Function to toggle scrollbar for modal */
export function toggleScrollbar() {
	const bodyElement = document.body;

	if (modalbg.style.display === "none") {
		bodyElement.style.overflow = null;
		bodyElement.style.paddingRight = null;
		bodyElement.style.maxWidth = null;
		return;
	}

	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth;

	bodyElement.style.maxWidth = `${
		bodyElement.offsetWidth + scrollbarWidth
	}px`;
	bodyElement.style.overflow = "hidden";
	bodyElement.style.paddingRight = `${scrollbarWidth}px`;
}

/** For the mobile topnav */
export function toggleMobileTopnav() {
	if (topnav.classList.contains("open-modal")) {
		topnav.classList.remove("open-modal");
		return;
	}

	topnav.classList.add("open-modal");
}

/**
 * Function to open success message
 * Fonction pour ouvrir le message de succès
 */
export function openFormSuccessMessage() {
	signupForm.style.display = "none";

	contentElement.classList.add("success");
	successElements.forEach((element) => {
		element.classList.remove("not-visible");
	});
}

/**
 * Function to close the success message
 * Fonction pour fermer le message de réussite
 */
export function closeFormSuccessMessage() {
	if (!signupForm.style.display) return;

	signupForm.style.display = null;

	contentElement.classList.remove("success");
	successElements.forEach((element) => {
		element.classList.add("not-visible");
		element.classList.remove("visible");
	});
}

export function closeModal() {
	modalbg.style.display = "none";
}

export function openModal() {
	modalbg.style.display = "block";
}
