export class Validator {
	/**
	 * @param {string} name
	 * @returns {boolean}
	 */
	static isName(name) {
		if (name?.trim().length < 2) return false;
		return true;
	}

	/**
	 * @param {string} email
	 * @returns {boolean}
	 */
	static isEmailAddress(email) {
		const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegExp.test(email);
	}

	/**
	 * @param {string} dateString
	 * @returns {boolean}
	 */
	static isDate(dateString) {
		const date = new Date(dateString);
		return !isNaN(date.getTime());
	}

	/**
	 * @param {string|number} quantity
	 * @param {number} min
	 * @param {number} max
	 * @returns {boolean}
	 */
	static isQuantityNumber(quantity, min = 0, max = 99) {
		const quantityValue = parseInt(quantity, 10);

		const isWithinRange = quantityValue >= min && quantityValue <= max;

		return !isNaN(quantityValue) && isWithinRange;
	}
}
