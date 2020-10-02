import App from "./components/App.svelte";
import "./styles/reset.css";
import "./styles/defaults.css";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
