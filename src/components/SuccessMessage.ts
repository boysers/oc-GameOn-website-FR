type SuccessMessageProps = {
	formElement: HTMLFormElement;
};

export const SuccessMessage = (
	selector: string,
	{ formElement }: SuccessMessageProps
) => {
	const successMessageElement: HTMLElement = document.querySelector(selector);

	const handleOpenSuccessMessage = () => {
		const isFormClose = formElement.classList.contains("close");
		if (isFormClose) return;
		formElement.classList.add("close");
		successMessageElement.classList.add("open");
	};

	const handleCloseSuccessMessage = () => {
		const isFormOpen = formElement.classList.contains("open");
		if (isFormOpen) return;
		formElement.classList.remove("close");
		successMessageElement.classList.remove("open");
	};

	const handlers = { handleOpenSuccessMessage, handleCloseSuccessMessage };

	return [successMessageElement, handlers] as const;
};
