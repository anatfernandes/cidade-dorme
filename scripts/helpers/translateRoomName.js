function translateRoomName(room) {
	const names = {
		1: "Banheiro",
		room_1: "Banheiro",
		2: "Quarto",
		room_2: "Quarto",
		3: "Cozinha",
		room_3: "Cozinha",
		4: "Lareira",
		room_4: "Lareira",
		5: "Sala de estar",
		room_5: "Sala de estar",
		6: "Sala de leitura",
		room_6: "Sala de leitura",
		7: "Sala da TV",
		room_7: "Sala da TV",
	};

	return names[room] || "Sala";
}

export { translateRoomName };
