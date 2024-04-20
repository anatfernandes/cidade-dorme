import { api } from "../services/api/index.js";
import {
	getElementValueByQuery,
	manageAlert,
	manageLocalStorage,
	redirectTo,
} from "./helpers/index.js";

let rooms = [];

function roomHasReachedLimit(room) {
	return room.players.length + 1 > room.settings.maxPlayers;
}

function sortRooms(prev) {
	if (roomHasReachedLimit(prev)) return 1;
	return -1;
}

function handleUpdateRooms() {
	const content = generateRoomsTemplates(rooms);
	document.querySelector("section#rooms-list").innerHTML = content;
}

function loadRooms() {
	rooms = api.listRooms();
	rooms.sort(sortRooms);

	handleUpdateRooms();
}

function generateRoomsTemplates(rooms) {
	const getClassname = (room) => {
		const roomReachedLimit = roomHasReachedLimit(room);
		const disabled = roomReachedLimit ? "disabled" : "";
		const limitReached = roomReachedLimit ? "limit-reached" : "";

		return `room ${disabled} ${limitReached}`.trim();
	};

	return rooms
		.map(
			(room) => `
				<article
					id="room-${room.number}"
					class="${getClassname(room)}"
					onclick="methods.enterRoom(event, ${room.number})"
					tabindex="0"
				>
					<span>${room.name}</span>
					<span class="players">
						${room.players.length} / ${room.settings.maxPlayers}
					</span>
				</article>
      `
		)
		.join("");
}

function enterRoom(event, roomNumber) {
	event.preventDefault();
	const room = rooms.find((room) => room.number === roomNumber);

	if (roomHasReachedLimit(room)) {
		manageAlert("Quantidade limite de jogares já alcaçado na sala!", "error");
		return;
	}

	manageLocalStorage.set(room, "room");
	redirectTo("room");
}

function handleSearch() {
	const search = getElementValueByQuery(document, "section#search input");
	const regex = new RegExp(search, "i");

	document.querySelector("section#search input").value = "";
	rooms = api.getRoomsByNameRegex(regex);
	rooms.sort(sortRooms);

	handleUpdateRooms();
}

function createRoom() {
	redirectTo("new-room");
}

window.methods = { loadRooms, enterRoom, handleSearch, createRoom };
