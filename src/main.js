import { topnavInit } from "./utils/topnav.js";
import { Modal } from "./controller/Modal.js";
import { Form } from "./controller/Form.js";
import { ModalFormController } from "./controller/ModalFormController.js";
import "./css/fonts.css";
import "./css/style.css";
import { UserFormDataBuilder } from "./models/UserFormDataBuilder.js";

function main() {
	topnavInit();

	const userFormDataBuilder = new UserFormDataBuilder();
	const form = new Form("#signup-form", userFormDataBuilder);
	const modal = new Modal(".bground");

	const modalFormController = new ModalFormController(modal, form);
	modalFormController.init();
}

main();
