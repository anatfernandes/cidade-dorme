function manageAlert(message, type = "success") {
	const alert = document.querySelector("div#alert");

	alert.innerHTML = message;
	alert.classList.add(type);
	alert.classList.remove("d-none");

	setTimeout(() => {
		alert.classList.add("d-none");
		alert.classList.remove(type);
		alert.innerHTML = "";
	}, 3000);
}

export { manageAlert };
