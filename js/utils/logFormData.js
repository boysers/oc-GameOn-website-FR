/**
 * Display field values in console log
 * For the test
 * @param {FormDataEvent} e
 * @returns {void}
 */
export function logFormData(e) {
	const formData = new FormData(e.currentTarget);
	const formDataObject = {};
	formData.forEach((value, key) => {
		formDataObject[key] = value;
	});
	console.log(formDataObject);
}
