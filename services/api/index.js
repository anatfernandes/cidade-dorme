import data from "../database/db.js";

function listRooms() {
	return data.rooms;
}

function getRoomByName(name) {
	return data.rooms.find((room) => room.name === name);
}

function createRoom(room) {
	const number = data.rooms.length + 1;
	const newRoom = { ...room, number };

	data.rooms.push(newRoom);

	return newRoom;
}

const api = {
	listRooms,
	getRoomByName,
	createRoom,
};

export { api };
