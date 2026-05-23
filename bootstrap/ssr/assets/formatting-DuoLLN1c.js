//#region resources/js/Composables/formatting.js
var numberToWord = (number) => {
	return [
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten"
	][number];
};
var formatMoney = (amount) => new Intl.NumberFormat("en-GB", {
	style: "currency",
	currency: "GBP"
}).format(amount / 100);
var formatDate = (value) => {
	if (!value) return "Pending activation";
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(new Date(value));
};
//#endregion
export { formatMoney as n, numberToWord as r, formatDate as t };
