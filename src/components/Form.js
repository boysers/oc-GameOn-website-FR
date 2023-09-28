import { Validator } from "../utils/Validator";

export class Form {
	_inputNames = [
		"firstname",
		"lastname",
		"email",
		"birthdate",
		"quantity",
		"location",
		"checkbox1",
		"checkbox2",
	];
	_isValidInputRules = {
		firstname: ({ value }) => Validator.isName(value),
		lastname: ({ value }) => Validator.isName(value),
		email: ({ value }) => Validator.isEmailAddress(value),
		birthdate: ({ value }) => Validator.isDate(value),
		quantity: ({ value }) => Validator.isQuantityNumber(value),
		location: (field) => field?.value,
		checkbox1: ({ checked }) => checked,
		checkbox2: () => true,
	};

	_fields = {};
	_inputs = {};

	formDOM = null;

	constructor(selector) {
		this.formDOM = document.querySelector(selector);

		this._fields = this._createFields();
		this._inputs = this._createInputs();
	}

	_onLocationRadioChange(e) {
		const target = e.target;
		if (target.type === "radio" && target.checked) {
			this._inputs.location = target;
		}
	}

	_createFields() {
		const fieldElements = this.formDOM.querySelectorAll(".formData");

		const fields = {};
		this._inputNames.forEach((name) => {
			const index = this._inputNames.indexOf(name);
			fields[name] = fieldElements[index];
		});

		return fields;
	}

	_createInputs() {
		const inputs = {};

		this._inputNames.forEach((name) => {
			inputs[name] = this._getInput(name);
		});

		return inputs;
	}

	_getField(name) {
		return this._fields[name];
	}

	_getInput(name) {
		const field = this._getField(name);
		if (!field) return field;

		if (name == "location") {
			field.addEventListener(
				"change",
				this._onLocationRadioChange.bind(this)
			);
			return null;
		}

		return field.querySelector('input:not([type="radio"]:not(:checked))');
	}

	_setFieldError(name, value = true) {
		const errorFormElement = this._getField(name);

		if (!errorFormElement) return;

		errorFormElement.setAttribute("data-error-visible", value);
	}

	_removeAllFieldErrors() {
		this._inputNames.forEach((fieldName) =>
			this._setFieldError(fieldName, false)
		);
	}

	isFormValid() {
		let isValid = true;
		this._removeAllFieldErrors();
		Object.entries(this._inputs).forEach(([name, input]) => {
			const validator = this._isValidInputRules[name];

			if (!validator(input)) {
				isValid = false;
				this._setFieldError(name);
			}
		});
		return isValid;
	}
}
