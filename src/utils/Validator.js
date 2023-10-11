export class Validator {
	static isName(name) {
		if (typeof name !== 'string') return false; 
		const trimmedName = name.trim();
		const isNonEmptyString = trimmedName.length >= 2; 
		const containsOnlyLetters = /^[a-zA-Z]+$/.test(trimmedName);
		return isNonEmptyString && containsOnlyLetters;
	}

	static isEmailAddress(email) {
		const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegExp.test(email);
	}

	static isDate(dateString) {
		const date = new Date(dateString);
		return !isNaN(date.getTime());
	}

	static isQuantityNumber(quantity, min = 0, max = 99) {
		const quantityValue = parseInt(quantity, 10);
		const isWithinRange = quantityValue >= min && quantityValue <= max;
		return !isNaN(quantityValue) && isWithinRange;
	}

	static isDateOfBirth(dateString) {
        const date = new Date(dateString);
        const currentYear = new Date().getFullYear();
        const minimumBirthYear = currentYear - 120;
        const maximumBirthYear = currentYear - 10;

        return (
            !isNaN(date.getTime()) &&
            date.getFullYear() >= minimumBirthYear &&
            date.getFullYear() <= maximumBirthYear
        );
    }
}
