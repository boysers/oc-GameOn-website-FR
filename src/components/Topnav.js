export const Topnav = () => {
	const topnav = document.querySelector("#myTopnav");

	function editNav() {
		if (topnav.classList.contains("responsive")) {
			topnav.classList.remove("responsive");
			return;
		}
		topnav.classList.add("responsive");
	}

	function toggleMobileTopnav() {
		if (topnav.classList.contains("open-modal")) {
			topnav.classList.remove("open-modal");
			return;
		}

		topnav.classList.add("open-modal");
	}

	function onClick(e) {
		e.preventDefault();
		editNav();
	}

	document.querySelector("#nav-btn").addEventListener("click", onClick);

	return [topnav, { toggleMobileTopnav }];
};
