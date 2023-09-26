/**
 * Validation for text
 * @param {string} text
 * @returns {boolean}
 */
export function isValidationText(text) {
	if (text?.trim().length < 2) return false;
	return true;
}

/**
 * Validation for email address
 * @param {string} email
 * @returns {boolean}
 */
export function isValidationEmailAddress(email) {
	const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegExp.test(email);
}

/**
 * Validation for date
 * @param {string} dateString
 * @returns {boolean}
 */
export function isValidationDate(dateString) {
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
export function isValidationQuantityNumber(quantity, min = 0, max = 99) {
	const quantityValue = parseInt(quantity, 10);

	const isWithinRange = quantityValue >= min && quantityValue <= max;

	return !isNaN(quantityValue) && isWithinRange;
}
