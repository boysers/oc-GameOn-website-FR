// ====== Modal.js ======

// === Values ===

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const signupForm = document.querySelector("#signup-form");
const formDataFields = document.querySelectorAll(".formData");

/** Form validity indicator */
let isFormValid = false;

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

// === Functions ===

/** Object containing validation functions for each field */
const validationForFieldRules = {
	firstname: ({ value }) => Validator.validationText(value),
	lastname: ({ value }) => Validator.validationText(value),
	email: ({ value }) => Validator.validationEmailAddress(value),
	birthdate: ({ value }) => Validator.validationDate(value),
	quantity: ({ value }) => Validator.validationQuantityNumber(value),
	location: (field) => field?.value,
	checkbox1: ({ checked }) => checked,
	checkbox2: () => true,
};

/**
 * Finds and returns the selected radio element if it exists, otherwise returns null
 * @param {HTMLInputElement[]} radioInputElements
 * @returns {HTMLInputElement|null}
 */
function getSelectedRadioButton(radioInputElements) {
	return radioInputElements.find((input) => input.checked) || null;
}

/**
 * Finds a form element based on the input name
 * @param {string} name
 * @returns {HTMLDivElement}
 */
function getFormDataFieldElementByName(name) {
	let formDataFieldElement = null;

	const index = formFieldNames.indexOf(name);
	if (index !== -1) {
		formDataFieldElement = formDataFields[index];
	}

	return formDataFieldElement;
}

/**
 * Find a form element based on input name and type
 * @param {string} name
 * @returns {HTMLInputElement}
 */
function getFieldElementByName(name) {
	if (!formFieldNames.includes(name)) return null;

	let fieldElement = getFormDataFieldElementByName(name);

	switch (name) {
		case "location":
			fieldElement = getSelectedRadioButton([
				...fieldElement.querySelectorAll("input"),
			]);
			break;
		case "checkbox1":
		case "checkbox2":
			fieldElement = fieldElement.children[0];
			break;
		default:
			fieldElement = fieldElement.querySelector("input");
			break;
	}

	return fieldElement;
}

/** Reset form fields */
function resetFieldElements() {
	formFieldNames.forEach((name) => {
		const inputElement = getFieldElementByName(name);

		if (!inputElement) return;

		if (inputElement.type === "radio" || inputElement.type === "checkbox") {
			inputElement.checked = inputElement.name === "checkbox1";
		} else {
			inputElement.value = "";
		}
	});
}

/** Function to create the fieldElements object */
function createFieldElementsObject() {
	const fieldElements = {};

	formFieldNames.forEach((fieldName) => {
		fieldElements[fieldName] = getFieldElementByName(fieldName);
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

	const fieldElements = createFieldElementsObject();

	removeAllFormDataFieldErrorVisibility(); // Remove all errors from the form

	for (const fieldName in fieldElements) {
		const field = fieldElements[fieldName];
		const validator = validationForFieldRules[fieldName];

		if (!validator(field)) {
			isFormValid = false;
			setFormDataFieldErrorVisibility(fieldName);
		}
	}

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
}

// === Utilities Class ===

/** Utility class for Modal. */
class ModalUtility {
	/** Method to toggle success form display */
	static toggleSuccessDisplay() {
		const content = document.querySelector(".content");

		if (!signupForm.style.display) {
			signupForm.style.display = "none";
			content.classList.add("success");
			document.querySelectorAll(".success-el").forEach((element) => {
				element.classList.toggle("not-visible");
				element.classList.toggle("visible");
			});
		} else {
			signupForm.style.display = null;
			content.classList.remove("success");
			document.querySelectorAll(".success-el").forEach((element) => {
				element.classList.toggle("not-visible");
				element.classList.toggle("visible");
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
		if (!text || text.length < 2 || text.trim() === "") {
			return false;
		}
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
		return (
			!isNaN(quantityValue) &&
			quantityValue >= min &&
			quantityValue <= max
		);
	}
}

// === Events ===

// Event form submit
signupForm.addEventListener("submit", handleFormSubmit);

// Events Modal
modalBtn.forEach((btn) => btn.addEventListener("click", openModal)); // Event to open the modal
modalbg.addEventListener("click", handleModalClickOutside); // Event to close the modal by clicking outside
document.addEventListener("keydown", handleModalKeydown); // Event to close the modal by pressing the "Escape" key
