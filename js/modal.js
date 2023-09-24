/**
 * @typedef {Object} FieldElementsInterface
 * @property {HTMLInputElement} firstname
 * @property {HTMLInputElement} lastname
 * @property {HTMLInputElement} email
 * @property {HTMLInputElement} birthdate
 * @property {HTMLInputElement} quantity
 * @property {HTMLInputElement|null} location
 * @property {HTMLInputElement} checkbox1
 * @property {HTMLInputElement} checkbox2
 */

/** Form validity indicator */
let isFormValid = false;
let isProd = true;

/** Form field names */
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

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const signupForm = document.querySelector("#signup-form");
const formDataFields = document.querySelectorAll(".formData");

const formFieldInputElements = createFieldInputElementsObject();

/** Object containing validation functions for each field */
const validationFormFieldRules = {
	firstname: ({ value }) => Validator.validationText(value),
	lastname: ({ value }) => Validator.validationText(value),
	email: ({ value }) => Validator.validationEmailAddress(value),
	birthdate: ({ value }) => Validator.validationDate(value),
	quantity: ({ value }) => Validator.validationQuantityNumber(value),
	location: (field) => field?.value,
	checkbox1: ({ checked }) => checked,
	checkbox2: () => true,
};

// Functions

/**
 * responsive navbar
 * @return {void}
 */
function editNav() {
	document.getElementById("myTopnav").classList.toggle("responsive");
}

/**
 * Display field values in console log
 * For the test
 * @returns {void}
 */
function logFormValues() {
	if (isProd) return;

	console.clear();
	Object.entries(formFieldInputElements).forEach((el) => {
		console.log(
			el[0],
			":",
			el[1]?.type !== "checkbox"
				? formatString(el[1]?.value)
				: el[1].checked
		);
	});
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
function formatString(str) {
	return str?.trim().replace(/\s+/g, " ") ?? "";
}

/**
 * Finds a form element based on the input name
 * @param {string} name
 * @returns {HTMLDivElement|null}
 */
function getFormDataFieldElementByName(name) {
	const index = formFieldNames.indexOf(name);
	return index !== -1 ? formDataFields[index] : null;
}

/**
 * Find a form element based on input name and type
 * @param {string} name
 * @returns {HTMLInputElement|null}
 */
function getFieldInputElementByName(name) {
	const fieldElement = getFormDataFieldElementByName(name);

	if (!fieldElement) return fieldElement;

	if (name == "location") {
		fieldElement.addEventListener("change", handleLocationChange);
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
		} else {
			inputElement.value = "";
		}
	});
}

/**
 * Function to create the fieldElements object
 * @returns {FieldElementsInterface}
 * */
function createFieldInputElementsObject() {
	const fieldElements = {};

	formFieldNames.forEach((fieldName) => {
		fieldElements[fieldName] = getFieldInputElementByName(fieldName);
	});

	return fieldElements;
}

/**
 * Select the form error element and turns its visibility on or off
 * @param {string} name
 * @param {boolean} value
 * @returns {void}
 */
function setFormDataFieldErrorVisibility(name, value = true) {
	const errorFormElement = getFormDataFieldElementByName(name);
	if (!errorFormElement) return;

	errorFormElement.setAttribute("data-error-visible", value);
}

/** Disable error visibility for all form fields */
function removeAllFormDataFieldErrorVisibility() {
	formFieldNames.forEach((fieldName) =>
		setFormDataFieldErrorVisibility(fieldName, false)
	);
}

/** Registration form validation function */
function validationFormSignup() {
	/** Form validity indicator */
	let isFormValid = true;

	removeAllFormDataFieldErrorVisibility(); // Remove all errors from the form

	Object.entries(formFieldInputElements).forEach(
		([fieldName, fieldElement]) => {
			const validator = validationFormFieldRules[fieldName];

			if (!validator(fieldElement)) {
				isFormValid = false;
				setFormDataFieldErrorVisibility(fieldName);
			}
		}
	);

	return isFormValid;
}

/** Open modal */
function openModal() {
	modalbg.style.display = "block";
	document.querySelector("#myTopnav").classList.add("open-modal");
	ModalUtility.toggleResponsiveScrollbar();
}

/** Close modal */
function closeModal() {
	modalbg.style.display = "none";
	document.querySelector("#myTopnav").classList.remove("open-modal");
	ModalUtility.toggleResponsiveScrollbar();

	if (isFormValid) {
		ModalUtility.toggleSuccessDisplay();
		isFormValid = false;
	}
}

/**
 * Handle the change event for the location field
 * @param {Event} e - The change event
 */
function handleLocationChange(e) {
	const target = e.target;
	if (target.type === "radio" && target.checked) {
		formFieldInputElements.location = target;
	}
}

/**
 * Handle the modal close event by clicking outside.
 * @param {MouseEvent} e
 */
function handleModalClickOutside(e) {
	const target = e.target;

	if (
		target === modalbg ||
		target.classList.contains("close") ||
		target.getAttribute("data-js") == "close"
	) {
		closeModal();
	}
}

/**
 * Handle the "Escape" key press event to close the modal if it is display.
 * @param {KeyboardEvent} e
 */
function handleModalKeydown(e) {
	if (e.key === "Escape" && !(modalbg.style.display === "none")) {
		closeModal();
	}
}

/**
 * Function for handle submit event
 * @param {FormDataEvent} e
 */
function handleFormSubmit(e) {
	e.preventDefault();

	isFormValid = validationFormSignup();

	if (isFormValid) {
		ModalUtility.toggleSuccessDisplay();
		resetFieldElements();
	}

	logFormValues(); // display field values in console log
}

// === Utilities Class ===

/** Utility class for Modal. */
class ModalUtility {
	/** Method to toggle success form display */
	static toggleSuccessDisplay() {
		const contentElement = document.querySelector(".content");

		if (!signupForm.style.display) {
			signupForm.style.display = "none";
			contentElement.classList.add("success");
			document.querySelectorAll(".success-el").forEach((element) => {
				element.classList.remove("not-visible");
			});
		} else {
			signupForm.style.display = null;
			contentElement.classList.remove("success");
			document.querySelectorAll(".success-el").forEach((element) => {
				element.classList.add("not-visible");
				element.classList.remove("visible");
			});
		}
	}

	/** Method to toggle scrollbar for modal */
	static toggleResponsiveScrollbar() {
		const bodyElement = document.body;

		if (!modalbg) return;

		if (modalbg.style.display === "none") {
			bodyElement.style.overflow = null;
			bodyElement.style.paddingRight = null;
			bodyElement.style.maxWidth = null;
		} else {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			bodyElement.style.maxWidth = `${
				bodyElement.offsetWidth + scrollbarWidth
			}px`;
			bodyElement.style.overflow = "hidden";
			bodyElement.style.paddingRight = `${scrollbarWidth}px`;
		}
	}
}

/** Utility class for data validation. */
class Validator {
	/**
	 * Validation for text
	 * @param {string} text
	 * @returns {boolean}
	 */
	static validationText(text) {
		if (text?.trim().length < 2) return false;
		return true;
	}

	/**
	 * Validation for email address
	 * @param {string} email
	 * @returns {boolean}
	 */
	static validationEmailAddress(email) {
		const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegExp.test(email);
	}

	/**
	 * Validation for date
	 * @param {string} dateString
	 * @returns {boolean}
	 */
	static validationDate(dateString) {
		const date = new Date(dateString);
		return !isNaN(date.getTime());
	}

	/**
	 * Validation for quantity (count of tournois)
	 * @param {string|number} quantity
	 * @param {number} min
	 * @param {number} max
	 * @returns {boolean}
	 */
	static validationQuantityNumber(quantity, min = 0, max = 99) {
		const quantityValue = parseInt(quantity, 10);

		const isWithinRange = quantityValue >= min && quantityValue <= max;

		return !isNaN(quantityValue) && isWithinRange;
	}
}

// === Events ===

// Event form submit
signupForm.addEventListener("submit", handleFormSubmit);

// Events Modal
modalBtn.forEach((btn) => btn.addEventListener("click", openModal)); // Event to open the modal
modalbg.addEventListener("mousedown", handleModalClickOutside); // Event to close the modal by clicking outside
document.addEventListener("keydown", handleModalKeydown); // Event to close the modal by pressing the "Escape" key

logFormValues();
