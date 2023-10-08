export class UserEntityException extends Error {
	constructor(public inputErrors: Record<string, string>) {
		super();
		this.name = "User Entity Exception";
		this.message = JSON.stringify(inputErrors);
		this.inputErrors = inputErrors;
	}
}
