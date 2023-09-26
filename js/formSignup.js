/**
 * Input Elements Object from form sign up.
 * @typedef {Object} FieldInputElementsInterface
 * @property {HTMLInputElement} firstname
 * @property {HTMLInputElement} lastname
 * @property {HTMLInputElement} email
 * @property {HTMLInputElement} birthdate
 * @property {HTMLInputElement} quantity
 * @property {HTMLInputElement|null} location
 * @property {HTMLInputElement} checkbox1
 * @property {HTMLInputElement} checkbox2
 */

import {
	isValidationText,
	isValidationEmailAddress,
	isValidationDate,
	isValidationQuantityNumber,
} from "./utils/isValidation.js";
import { logFormData } from "./utils/logFormData.js";
import { openFormSuccessMessage } from "./utils/modalUtility.js";

// DOM elements for sign up form.
// 				pour le formulaire d'inscription.
const formDataFields = document.querySelectorAll(".formData");

/**
 * Form field names.
 * Noms des champs du formulaire.
 */
const formFieldNames = [
	"firstname",
	"lastname",
	"email",
	"birthdate",
	"quantity",
	"location",
	"checkbox1",
	"checkbox2",
];

/**
 * Input Elements Object.
 * @returns {FieldInputElementsInterface}
 */
const formFieldInputElements = createFieldInputElementsObject();

/**
 * The object contains validation functions for each field.
 * L'objet contient des fonctions de validation pour chaque champ.
 */
const isValidationFormFieldRules = {
	firstname: ({ value }) => isValidationText(value),
	lastname: ({ value }) => isValidationText(value),
	email: ({ value }) => isValidationEmailAddress(value),
	birthdate: ({ value }) => isValidationDate(value),
	quantity: ({ value }) => isValidationQuantityNumber(value),
	location: (field) => field?.value,
	checkbox1: ({ checked }) => checked,
	checkbox2: () => true,
};

/**
 * Find a field based on the field name.
 * Recherche un champ basée sur le nom d'un champ
 * @param {string} name
 * @returns {HTMLDivElement|null}
 */
function getFormDataFieldElementByName(name) {
	const index = formFieldNames.indexOf(name);
	return index !== -1 ? formDataFields[index] : null;
}

/**
 * Find for input based on name.
 * Rechercher une entrée basée sur le nom
 * @param {string} name
 * @returns {HTMLInputElement|null}
 */
function getFieldInputElementByName(name) {
	const fieldElement = getFormDataFieldElementByName(name);

	if (!fieldElement) return fieldElement;

	if (name == "location") {
		fieldElement.addEventListener("change", handleLocationRadioChange);
		return null;
	}

	return fieldElement.querySelector("input");
}

/** Reset form fields */
function resetFieldElements() {
	Object.values(formFieldInputElements).forEach((inputElement) => {
		if (!inputElement) return;

		if (["radio", "checkbox"].includes(inputElement.type)) {
			inputElement.checked = inputElement.name === "checkbox1";

			if (inputElement.name == "location") {
				formFieldInputElements.location = null;
			}
			return;
		}

		inputElement.value = "";
	});
}

/**
 * Function to create the fieldElements object.
 * Fonction pour créer l'objet fieldElements.
 * @returns {FieldInputElementsInterface} FieldInputElements
 * */
function createFieldInputElementsObject() {
	const fieldElements = {};

	formFieldNames.forEach((fieldName) => {
		fieldElements[fieldName] = getFieldInputElementByName(fieldName);
	});

	return fieldElements;
}

/**
 * Select a form field and enable or disable the error
 * Sélectionne un champ du formulaire et activez ou désactivez l'erreur
 * @param {string} name
 * @param {boolean} value
 */
function setFormDataFieldErrorVisibility(name, value = true) {
	const errorFormElement = getFormDataFieldElementByName(name);

	if (!errorFormElement) return;

	errorFormElement.setAttribute("data-error-visible", value);
}

/**
 * Removes the error for all form fields
 * Retire l'erreur pour tous les champs du formulaire
 */
function removeAllFormDataFieldErrorVisibility() {
	formFieldNames.forEach((fieldName) =>
		setFormDataFieldErrorVisibility(fieldName, false)
	);
}

/**
 * Registration form validation function
 * Fonction de validation du formulaire d'inscription
 * @returns {boolean} boolean
 */
function isFormValid() {
	let isValid = true;
	removeAllFormDataFieldErrorVisibility(); // Remove all errors from the form
	Object.entries(formFieldInputElements).forEach(
		([fieldName, fieldElement]) => {
			const validator = isValidationFormFieldRules[fieldName];

			if (!validator(fieldElement)) {
				isValid = false;
				setFormDataFieldErrorVisibility(fieldName);
			}
		}
	);
	return isValid;
}

/**
 * Handle the change event for the location field.
 * @param {Event} e - The change event
 */
function handleLocationRadioChange(e) {
	const target = e.target;
	if (target.type === "radio" && target.checked) {
		formFieldInputElements.location = target;
	}
}

/**
 * Function for submit event
 * Fonction pour l'événement submit
 * @param {FormDataEvent} e
 */
function handleFormSubmit(e) {
	e.preventDefault();

	if (!isFormValid()) return;

	logFormData(e);
	openFormSuccessMessage();
	resetFieldElements();
}

/**
 * Initialize form sign up
 * Initialise le formulaire d'inscription
 * @returns {void}
 */
export function initFormSignup() {
	document
		.querySelector("#signup-form")
		.addEventListener("submit", handleFormSubmit);
}
