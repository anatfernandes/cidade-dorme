import { translateRoomName } from "../helpers/index.js";

let preSelectedRooms;
let allowMultiple;
let selectedRooms;

function setupSelectRooms({
	preSelectRooms,
	rooms = [],
	multiple = true,
	label = true,
} = {}) {
	preSelectedRooms = preSelectRooms;
	selectedRooms = rooms;
	allowMultiple = multiple;

	let content = "";

	if (label) content += generateLabel();

	content += `<div>${generateRooms()}</div>`;

	document.querySelector("section#select-rooms").innerHTML = content;
}

function selectMultipleRooms(room) {
	document
		.querySelector(`article#select-room-${room}`)
		.classList.toggle("selected");

	const existingRoom = selectedRooms.indexOf(room);

	if (existingRoom === -1) selectedRooms.push(room);
	else selectedRooms.splice(existingRoom, 1);

	selectedRooms.sort();
}

function selectOneRoom(room) {
	document
		.querySelectorAll("article.select-room.selected")
		.forEach((element) => element.classList.remove("selected"));

	document
		.querySelector(`article#select-room-${room}`)
		.classList.toggle("selected");

	selectedRooms.splice(0, 8);
	selectedRooms.push(room);
}

function selectRoom(room) {
	if (allowMultiple) selectMultipleRooms(room);
	else selectOneRoom(room);
}

function generateLabel() {
	return "<span class='select-rooms-label'>Selecione a(s) sala(s)</span>";
}

function generateRooms() {
	const rooms = preSelectedRooms?.length
		? [...preSelectedRooms]
		: new Array(7).fill(1).map((_, index) => ({
				name: translateRoomName((index += 1)),
				number: index,
		  }));

	return rooms
		.map(
			(room) => `
        <article
          id="select-room-${room.number}"
          class="select-room"
          onclick="selectRoom(${room.number})"
        >
          <img src="../assets/rooms/room_${room.number}.svg" alt="${room.name}" />
          <span>${room.name}</span>
        </article>
      `
		)
		.join("");
}

window.selectRoom = selectRoom;

export { setupSelectRooms, generateRooms };
