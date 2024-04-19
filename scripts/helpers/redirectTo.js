function redirectTo(page = "index") {
	window.location.pathname = `../app/${page}.html`;
}

export { redirectTo };
