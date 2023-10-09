export function Modal(selector, options) {
	const modalElement = document.querySelector(selector);
	const openBtnElements = document.querySelectorAll("[data-js='open-modal']");
	const onClose = options.onClose;
	const onOpen = options.onOpen;
	const isOnClose = typeof onClose === "function";
	const isOnOpen = typeof onOpen === "function";

	const toggleScrollbar = () => {
		const bodyElement = document.body;

		if (modalElement.style.display) {
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
	};

	const toggleModalDisplay = () => {
		toggleScrollbar();
		if (!modalElement.style.display) {
			modalElement.style.display = "block";
			return;
		}
		modalElement.style.display = null;
	};

	const handleOpenModal = (e) => {
		toggleModalDisplay();
		if (isOnOpen) {
			onOpen(e);
		}
	};

	const handleCloseModal = (e) => {
		const isOpen = modalElement.style.display !== "block";
		if (isOpen) return;

		const isKeyboardEvent = e instanceof KeyboardEvent;
		const isEvent = e instanceof Event;
		const isTargetElement = isEvent && e.target instanceof HTMLElement;
		const isEscapeKey = isKeyboardEvent && e.key === "Escape";
		const isModalElement = isTargetElement && e.target === modalElement;
		const isCloseModalBtn =
			isTargetElement &&
			e.target.getAttribute("data-js") === "close-modal";

		if (isEscapeKey || isModalElement || isCloseModalBtn) {
			toggleModalDisplay();
			if (isOnClose) {
				onClose(e);
			}
		}
	};

	openBtnElements.forEach((btn) => {
		btn.addEventListener("click", handleOpenModal);
	});
	modalElement.addEventListener("mousedown", handleCloseModal);
	document.addEventListener("keydown", handleCloseModal);

	return [modalElement, { toggleModalDisplay }];
}
