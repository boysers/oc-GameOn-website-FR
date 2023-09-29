import { FormDataException } from "../utils/FormDataException";

export class Form {
	_inputNames = [];
	_fields = {};
	_inputs = {};

	_formDataBuilder = null;
	formDOM = null;

	constructor(selector, formDataBuilder) {
		this.formDOM = document.querySelector(selector);

		this._formDataBuilder = formDataBuilder;
		this._inputNames = Object.keys(formDataBuilder).map((key) => key);

		this._fields = this._createFields();
		this._inputs = this._createInputs();

		this._onRadioChange = this._onRadioChange.bind(this);
	}

	createData() {
		this._removeAllFieldErrors();

		try {
			const formData = this._extractInputValues(this._inputs);
			const dataBuilder = this._formDataBuilder.setData(formData);
			return dataBuilder.build();
		} catch (error) {
			if (error instanceof FormDataException) {
				Object.entries(error.errors).forEach(([name, errorMessage]) => {
					this._setFieldError(name, true, errorMessage);
				});
			}
			throw error;
		}
	}

	reset() {
		this.formDOM.reset();
		this._inputs = this._createInputs();
	}

	_extractInputValues() {
		let formData = {};
		Object.entries(this._inputs).forEach(([key, input]) => {
			if (!input) {
				formData[key] = null;
				return;
			}
			if (input.type == "checkbox") {
				formData[key] = input.checked;
				return;
			}
			if (input.type == "number") {
				formData[key] = input?.value ?? null;
				return;
			}
			formData[key] = input.value;
		});
		return formData;
	}

	_onRadioChange(e, name) {
		const target = e.target;
		if (target.type === "radio" && target.checked) {
			this._inputs[name] = target;
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

		const fieldRadio = field.querySelectorAll("input[type='radio']");

		if (fieldRadio.length > 1) {
			field.addEventListener("change", (e) => {
				this._onRadioChange(e, name);
			});
			return null;
		}

		return field.querySelector('input:not([type="radio"]:not(:checked))');
	}

	_setFieldError(name, isError = true, errorMessage = "") {
		const errorField = this._getField(name);

		if (!errorField) return;

		if (isError) {
			errorField.setAttribute("data-error-visible", true);
			errorField.setAttribute("data-error", errorMessage);
			return;
		}

		errorField.setAttribute("data-error-visible", false);
		errorField.setAttribute("data-error", errorMessage);
	}

	_removeAllFieldErrors() {
		this._inputNames.forEach((fieldName) =>
			this._setFieldError(fieldName, false)
		);
	}
}
