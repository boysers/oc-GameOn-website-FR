import { Form } from "./components/Form";
import { Modal } from "./components/Modal";
import { SuccessMessage } from "./components/SuccessMessage";
import { Topnav } from "./components/Topnav";
import { User, UserEntityException } from "./entities/User";
import "./style.css";

function main() {
	const onSubmit = (e: FormDataEvent) => {
		e.preventDefault();

		const formElement = e.target;
		const isFormElement = formElement instanceof HTMLFormElement;
		if (!isFormElement) return;

		const inputs = formElement.elements;

		const formData = {
			firstname: inputs["firstname"].value,
			lastname: inputs["lastname"].value,
			email: inputs["email"].value,
			birthdate: inputs["birthdate"].value,
			quantity: parseInt(inputs["quantity"].value, 10),
			location: inputs["location"].value,
			checkbox1: inputs["checkbox1"].checked,
			checkbox2: inputs["checkbox2"].checked,
		};

		const fieldElements = formElement.querySelectorAll(".formData");
		// Reset error fields
		fieldElements.forEach((field: HTMLElement) => {
			field.setAttribute("data-error-visible", "false");
			field.setAttribute("data-error", "");
		});

		const fields = Object.fromEntries(
			Object.keys(formData).map(
				(name, index) => [name, fieldElements[index]] as const
			)
		);

		try {
			const user = User.createUser(formData);
			handleOpenSuccessMessage();
			console.log("Formulaire :", user.snapshot);
			formElement.reset();
		} catch (error) {
			if (error instanceof UserEntityException) {
				Object.entries(error.inputErrors).forEach(([key, value]) => {
					const field = fields[key];
					field.setAttribute("data-error-visible", "true");
					field.setAttribute("data-error", value);
				});
			}
		}
	};

	const [_topnav, { toggleMobileTopnav }] = Topnav();

	const [formElement] = Form("#signup-form", { onSubmit });

	const [
		_successMessage,
		{ handleOpenSuccessMessage, handleCloseSuccessMessage },
	] = SuccessMessage("#form-success", { formElement });

	Modal(".bground", {
		onOpen: toggleMobileTopnav,
		onClose: () => {
			toggleMobileTopnav();
			handleCloseSuccessMessage();
		},
	});
}

main();
