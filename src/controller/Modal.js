import { toggleMobileTopnav } from "../utils/topnav";

export class Modal {
	modalDOM = null;

	constructor(selector) {
		this.modalDOM = document.querySelector(selector);
	}

	_toggleScrollbar() {
		const bodyElement = document.body;

		if (this.modalDOM.style.display === "none") {
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

	openModal() {
		this.modalDOM.style.display = "block";
		this._toggleScrollbar();
		toggleMobileTopnav();
	}

	closeModal() {
		this.modalDOM.style.display = "none";
		this._toggleScrollbar();
		toggleMobileTopnav();
	}

	/**
	 * @param {HTMLElement} targetElement
	 * @returns {boolean}
	 */
	isClickOutsideModal(targetElement) {
		if (!targetElement) return;

		const isModalbg = targetElement == this.modalDOM;
		const isCloseModalBtn =
			targetElement.getAttribute("data-js") == "close-modal";

		if (isModalbg || isCloseModalBtn) return true;
		return false;
	}
}
