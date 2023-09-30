type ModalProps = {
	onClose?: (e: Event | KeyboardEvent) => void;
	onOpen?: (e: Event | KeyboardEvent) => void;
};

export const Modal = (selector: string, { onClose, onOpen }: ModalProps) => {
	const modalElement: HTMLElement = document.querySelector(selector);
	const openBtnElements = document.querySelectorAll("[data-js='open-modal'");

	const isOnClose = onClose instanceof Function;
	const isOnOpen = onOpen instanceof Function;

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

	const handleOpenModal = (e: Event) => {
		toggleModalDisplay();
		if (isOnOpen) {
			onOpen(e);
		}
	};

	const handleCloseModal = (e: Event | KeyboardEvent) => {
		const isOpen = modalElement.style.display != "block";
		if (isOpen) return;

		const isKeyboardEvent = e instanceof KeyboardEvent;
		const isEvent = e instanceof Event;

		const isTargetElement = isEvent && e.target instanceof HTMLElement;

		const isEscapeKey = isKeyboardEvent && e.key == "Escape";
		const isModalElement = isTargetElement && e.target === modalElement;
		const isCloseModalBtn =
			isTargetElement &&
			e.target.getAttribute("data-js") == "close-modal";

		if (isEscapeKey || isModalElement || isCloseModalBtn) {
			toggleModalDisplay();
			if (isOnClose) {
				onClose(e);
			}
		}
	};

	openBtnElements.forEach((btn) =>
		btn.addEventListener("click", handleOpenModal)
	);
	modalElement.addEventListener("mousedown", handleCloseModal);
	document.addEventListener("keydown", handleCloseModal);

	return [modalElement, { toggleModalDisplay }] as const;
};
