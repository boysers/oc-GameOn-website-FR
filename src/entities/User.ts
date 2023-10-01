import { Validator } from "../utils/Validator";

interface IUserProps {
	firstname: string;
	lastname: string;
	email: string;
	birthdate: string;
	quantity: number;
	location: string;
	checkbox1: boolean;
	checkbox2: boolean;
}

export class UserEntityException extends Error {
	constructor(public inputErrors: Record<string, string>) {
		super();
		this.name = "User Entity Exception";
		this.message = JSON.stringify(inputErrors);
		this.inputErrors = inputErrors;
	}
}

export class User {
	static createUser(props: IUserProps) {
		const user = new User(props);
		user.validate();
		return user;
	}

	private constructor(private props: IUserProps) {}

	private validate() {
		const rules = {
			firstname: {
				validationFunction: (name: string) => Validator.isName(name),
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
			},
			lastname: {
				validationFunction: (name: string) => Validator.isName(name),
				errorMessage:
					"Veuillez entrer 2 caractères ou plus pour le champ du nom.",
			},
			email: {
				validationFunction: (email: string) =>
					Validator.isEmailAddress(email),
				errorMessage: "Veuillez entrer un email valide.",
			},
			birthdate: {
				validationFunction: (date: string) => Validator.isDate(date),
				errorMessage: "Vous devez entrer votre date de naissance.",
			},
			quantity: {
				validationFunction: (quantity: string) =>
					Validator.isQuantityNumber(quantity),
				errorMessage:
					"Veuillez entrer le nombre de tournois GameOn auxquels vous avez déjà participé.",
			},
			location: {
				validationFunction: (location: string) => !!location,
				errorMessage: "Vous devez choisir une option.",
			},
			checkbox1: {
				validationFunction: (checked: boolean) => checked,
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

	set firstname(first: string) {
		this.props.firstname = first;
	}

	set lastname(last: string) {
		this.props.lastname = last;
	}

	set email(email: string) {
		this.props.email = email;
	}

	set birthdate(date: string) {
		this.props.birthdate = date;
	}

	set quantity(quantity: number) {
		this.props.quantity = quantity;
	}

	set location(location: string) {
		this.props.location = location;
	}

	set checkbox1(checked: boolean) {
		this.props.checkbox1 = checked;
	}

	set checkbox2(checked: boolean) {
		this.props.checkbox2 = checked;
	}
}
