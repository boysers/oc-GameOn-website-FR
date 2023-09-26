import {
	closeFormSuccessMessage,
	closeModal,
	openModal,
	toggleMobileTopnav,
	toggleScrollbar,
} from "./utils/modalUtility.js";

const modalbg = document.querySelector(".bground");

/**
 * @param {MouseEvent} e
 * */
function closeModalClick(e) {
	const isModalbg = e.target == modalbg;
	const isCloseModalBtn = e.target.getAttribute("data-js") == "close-modal";

	if (!(isModalbg || isCloseModalBtn)) return;

	closeModal();
	toggleScrollbar();
	toggleMobileTopnav();
	closeFormSuccessMessage();
}

function openModalClick() {
	openModal();
	toggleScrollbar();
	toggleMobileTopnav();
}

/**
 * Handle the "Escape" key press event to close the modal if it is display.
 * @param {KeyboardEvent} e
 */
function handleModalKeydown(e) {
	if (e.key === "Escape" && modalbg.style.display === "display") {
		closeModalClick();
	}
}

export function initModal() {
	// Event to open the modal
	document
		.querySelectorAll("[data-js='open-modal'")
		.forEach((btn) => btn.addEventListener("click", openModalClick));

	// Event to close the modal
	modalbg.addEventListener("mousedown", closeModalClick);

	// Event to close the modal by pressing the "Escape" key
	document.addEventListener("keydown", handleModalKeydown);
}
