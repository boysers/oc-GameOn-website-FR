import { defineConfig } from "vite";

export default defineConfig({
	base:
		process.env.NODE_ENV === "production"
			? "https://boysers.github.io/oc-GameOn-website-FR"
			: "/",
});
