import { topnavInit } from "./components/topnav.js";
import { Modal } from "./components/Modal.js";
import { Form } from "./components/form.js";
import { ModalFormController } from "./controller/ModalFormController.js";
import "./css/fonts.css";
import "./css/style.css";
import { User } from "./models/User.js";

function main() {
	topnavInit();

	const form = new Form("#signup-form");
	const modal = new Modal(".bground");
	const modalFormInterface = new ModalFormController(modal, form);
	modalFormInterface.init();

	const userArray = [];
	const user1 = new User(
		"Jean",
		"Claude",
		"contact@example.com",
		"10/08/1999",
		"Paris",
		true,
		false
	);
	Object.entries(user1).forEach(([key, value]) => {
		console.log(`${key}: ${value}`);
		userArray.push(value);
	});
	console.log(userArray);
}

main();
