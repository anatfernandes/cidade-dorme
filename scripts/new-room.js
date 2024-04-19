import { api } from "../services/api/index.js";
import {
	getElementValueByQuery,
	manageAlert,
	manageLocalStorage,
	redirectTo,
} from "./helpers/index.js";
import { setupSelectRooms } from "./common/selectRooms.js";

const rooms = [];

function loadRooms() {
	setupSelectRooms({ rooms });
}

function validateFields({ name, murders, angels, detectives, maxPlayers }) {
	if (!name) throw new Error("O nome deve ser informado!");

	if (api.getRoomByName(name)) {
		throw new Error("Já existe uma sala com esse nome!");
	}

	if (maxPlayers < 5 || maxPlayers > 15) {
		throw new Error("O número de jogadores deve ser entre 5 e 15!");
	}

	if (murders < 1 || murders > 5) {
		throw new Error("O número de assassinos deve ser entre 1 e 5!");
	}

	if (angels < 1 || angels > 5) {
		throw new Error("O número de anjos deve ser entre 1 e 5!");
	}

	if (detectives < 1 || detectives > 5) {
		throw new Error("O número de detetives deve ser entre 1 e 5!");
	}

	if ((murders + angels + detectives) / maxPlayers > 0.7) {
		throw new Error(
			"O número de jogadores deve ser maior para essa quantidade de assassinos, anjos e detetives!"
		);
	}

	if (!rooms.length) {
		throw new Error("É necessário escolher ao menos 1 sala!");
	}
}

function create(event, form) {
	event.preventDefault();

	const name = getElementValueByQuery(form, "input#room-name");
	const maxPlayers = getElementValueByQuery(
		form,
		"input#players-quantity",
		"number"
	);
	const murders = getElementValueByQuery(
		form,
		"input#murders-quantity",
		"number"
	);
	const angels = getElementValueByQuery(
		form,
		"input#angels-quantity",
		"number"
	);
	const detectives = getElementValueByQuery(
		form,
		"input#detectives-quantity",
		"number"
	);

	try {
		validateFields({ name, murders, angels, detectives, maxPlayers });
	} catch (error) {
		manageAlert(error.message, "error");
	}

	const room = api.createRoom({
		name,
		players: [],
		settings: {
			maxPlayers,
			murders,
			angels,
			detectives,
			rooms,
		},
	});

	manageLocalStorage.set(room, "room");
	redirectTo("room");
}

window.methods = { create, loadRooms };
