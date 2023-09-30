export class Validator {
	static isName(name: string): boolean {
		if (name?.trim().length < 2) return false;
		return true;
	}

	static isEmailAddress(email: string): boolean {
		const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailRegExp.test(email);
	}

	static isDate(dateString: string): boolean {
		const date = new Date(dateString);
		return !isNaN(date.getTime());
	}

	static isQuantityNumber(
		quantity: string,
		min: number = 0,
		max: number = 99
	): boolean {
		const quantityValue = parseInt(quantity, 10);
		const isWithinRange = quantityValue >= min && quantityValue <= max;
		return !isNaN(quantityValue) && isWithinRange;
	}
}
