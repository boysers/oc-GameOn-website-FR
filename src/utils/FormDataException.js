export class FormDataException extends Error {
	constructor(message, errors) {
		super(message);
		this.name = "FormDataException";
		this.errors = errors;
	}
}
