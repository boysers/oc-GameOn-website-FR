import { Validator } from "../utils/Validator.js";
import { UserEntityException } from "./UserEntityException.js";

export class User {
	constructor(props) {
		this.props = props;
	}

	static createUser(props) {
		const user = new User(props);
		user.validate();
		return user;
	}

	validate() {
		const rules = {
			firstname: {
				validationFunction: (name) => Validator.isName(name),
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
			},
			lastname: {
				validationFunction: (name) => Validator.isName(name),
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du nom.",
			},
			email: {
				validationFunction: (email) => Validator.isEmailAddress(email),
				errorMessage: "Veuillez entrer un email valide.",
			},
			birthdate: {
				validationFunction: (date) => Validator.isDateOfBirth(date),
				errorMessage: "Vous devez entrer votre date de naissance.",
			},
			quantity: {
				validationFunction: (quantity) =>
					Validator.isQuantityNumber(quantity),
				errorMessage:
					"Veuillez entrer le nombre de tournois GameOn auxquels vous avez déjà participé.",
			},
			location: {
				validationFunction: (location) => !!location,
				errorMessage: "Vous devez choisir une option.",
			},
			checkbox1: {
				validationFunction: (checked) => checked,
				errorMessage:
					"Vous devez vérifier que vous acceptez les termes et conditions.",
			},
		};

		const invalidInput = {};

		Object.entries(this.snapshot).forEach(([key, values]) => {
			if (!rules[key]) return;
			const { validationFunction, errorMessage } = rules[key];
			if (!validationFunction(values)) {
				invalidInput[key] = errorMessage;
			}
		});

		if (Object.keys(invalidInput).length > 0) {
			throw new UserEntityException(invalidInput);
		}
	}

	get snapshot() {
		return this.props;
	}
}
