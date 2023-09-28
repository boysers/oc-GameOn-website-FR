import { Validator } from "./Validator";

export class UserValidator {
	static validateUser(user) {
		const rules = {
			firstname: {
				validator: (name) => Validator.isName(name),
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
			},
			lastname: {
				validator: (name) => Validator.isName(name),
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du nom.",
			},
			email: {
				validator: (email) => Validator.isEmailAddress(email),
				errorMessage: "Veuillez entrer un email valide.",
			},
			birthdate: {
				validator: (date) => Validator.isDate(date),
				errorMessage: "Vous devez entrer votre date de naissance.",
			},
			quantity: {
				validator: (quantity) => Validator.isQuantityNumber(quantity),
				errorMessage:
					"Veuillez entrer le nombre de tournois GameOn auxquels vous avez déjà participé.",
			},
			location: {
				validator: (location) => !!location,
				errorMessage: "Vous devez choisir une option.",
			},
			checkbox1: {
				validator: (checked) => checked,
				errorMessage:
					"Vous devez vérifier que vous acceptez les termes et conditions.",
			},
			checkbox2: { validator: () => true, errorMessage: "" },
		};

		const errors = {};
		Object.entries(user).forEach(([key, values]) => {
			const { validator, errorMessage } = rules[key];

			if (!validator(values)) {
				errors[key] = errorMessage;
			}
		});

		return errors;
	}
}
