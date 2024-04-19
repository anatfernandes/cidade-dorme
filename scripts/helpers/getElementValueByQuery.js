function getElementValueByQuery(element = document, query, type) {
	const value = element.querySelector(query).value;

	if (type === "number") return Number(value);

	return value;
}

export { getElementValueByQuery };
