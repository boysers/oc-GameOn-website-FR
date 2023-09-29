export class ModalFormController {
	_modalController = null;
	_formController = null;

	_successMessageDOM = null;

	constructor(modal, form) {
		this._modalController = modal;
		this._formController = form;

		this._successMessageDOM = document.querySelector("#form-success");

		this._onOpenModalClick = this._onOpenModalClick.bind(this);
		this._onCloseModalClick = this._onCloseModalClick.bind(this);
		this._onCloseModalKeydown = this._onCloseModalKeydown.bind(this);
		this._onFormSubmit = this._onFormSubmit.bind(this);
	}

	_openSuccessMessage() {
		this._formController.formDOM.classList.add("close");
		this._successMessageDOM.classList.add("open");
	}

	_closeSuccessMessage() {
		const form = this._formController.formDOM;
		if (!form.classList.contains("close")) return;

		form.classList.remove("close");
		this._successMessageDOM.classList.remove("open");
	}

	_onOpenModalClick() {
		this._modalController.openModal();
	}

	_onCloseModalClick(e) {
		if (!this._modalController.isClickOutsideModal(e.target)) return;

		this._modalController.closeModal();
		this._closeSuccessMessage();
	}

	_onCloseModalKeydown(e) {
		const isEscapeKey = e.key === "Escape";
		const isActiveModal =
			this._modalController.modalDOM.style.display === "block";

		if (isEscapeKey && isActiveModal) {
			this._modalController.closeModal();
			this._closeSuccessMessage();
		}
	}

	_onFormSubmit(e) {
		e.preventDefault();

		const formController = this._formController;

		try {
			const formData = formController.createData();

			console.log(formData);

			this._openSuccessMessage();
			formController.reset()
		} catch (error) {
			console.error(error);
		}
	}

	_modalInit() {
		const modal = this._modalController.modalDOM;
		const openModalButtons = document.querySelectorAll(
			"[data-js='open-modal'"
		);

		openModalButtons.forEach((btn) =>
			btn.addEventListener("click", this._onOpenModalClick)
		);
		modal.addEventListener("mousedown", this._onCloseModalClick);
		document.addEventListener("keydown", this._onCloseModalKeydown);
	}

	_formInit() {
		this._formController.formDOM.addEventListener(
			"submit",
			this._onFormSubmit
		);
	}

	init() {
		this._modalInit();
		this._formInit();
	}
}
