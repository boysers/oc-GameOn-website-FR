export class UserEntityException extends Error {
	constructor(inputErrors) {
		super();
		this.name = "User Entity Exception";
		this.message = JSON.stringify(inputErrors);
		this.inputErrors = inputErrors;
	}
}
