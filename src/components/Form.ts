type FormProps = {
	onSubmit?: (e: FormDataEvent) => void;
};

export const Form = (selector: string, { onSubmit }: FormProps) => {
	const formElement: HTMLFormElement = document.querySelector(selector);

	if (onSubmit instanceof Function) {
		formElement.addEventListener("submit", onSubmit);
	}

	return [formElement] as const;
};
