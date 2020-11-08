import App from "./components/App.svelte";

import "water.css/out/water.css";
import "./styles/reset.css";
import "./styles/defaults.css";

const app = new App({
  target: document.body,
});

export default app;
