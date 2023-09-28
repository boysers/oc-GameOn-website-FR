import { UserValidator } from "../utils/UserValidator.js";
import { User } from "./User.js";

export class UserFormDataBuilder {
	constructor() {
		this.firstname = "";
		this.lastname = "";
		this.email = "";
		this.birthdate = "";
		this.quantity = null;
		this.location = "";
		this.checkbox1 = true;
		this.checkbox2 = false;
	}

	setData(user) {
		this.firstname = user?.firstname;
		this.lastname = user?.lastname;
		this.email = user?.email;
		this.birthdate = user?.birthdate;
		this.quantity = user?.quantity;
		this.location = user?.location;
		this.checkbox1 = user?.checkbox1;
		this.checkbox2 = user?.checkbox2;
		return this;
	}

	build() {
		const errors = UserValidator.validateUser(this);

		if (Object.keys(errors).length > 0) {
			throw errors;
		}

		return new User(
			this.firstname,
			this.lastname,
			this.email,
			this.birthdate,
			this.quantity,
			this.location,
			this.checkbox1,
			this.checkbox2
		);
	}
}
