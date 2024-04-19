const storageKey = "app";

function parse(storage = "{}") {
	return JSON.parse(storage);
}

function stringify(storage) {
	return JSON.stringify(storage);
}

function get(key) {
	const value = localStorage.getItem(storageKey) || "{}";
	const parsedValue = parse(value);

	if (!key) return parsedValue;

	return parsedValue[key];
}

function set(value, key) {
	const data = get();
	data[key] = value;
	localStorage.setItem(storageKey, stringify(data));
}

function remove(key) {
	const data = get();
	delete data[key];
	localStorage.setItem(storageKey, stringify(data));
}

function clear() {
	localStorage.clear();
}

const manageLocalStorage = {
	get,
	set,
	remove,
	clear,
};

export { manageLocalStorage };
