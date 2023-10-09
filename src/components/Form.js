export const Form = (selector, { onSubmit }) => {
	const formElement = document.querySelector(selector);

	if (onSubmit instanceof Function) {
		formElement.addEventListener("submit", onSubmit);
	}

	return [formElement];
};
