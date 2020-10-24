<script lang="ts">
  import players from "root/lib/playersStore";
  import InitiativeInput from "./InitiativeInput.svelte";
  import PlayersList from "./PlayersList.svelte";

  function handleReset() {
    if (!window.confirm("Are you sure?")) return;

    players.reset();
  }
</script>

<style>
  main {
    --vertical-spacing: 2.5rem;

    display: flex;
    flex-direction: column;
    height: calc(100vh - calc(var(--vertical-spacing) * 2));
    max-width: 40em;
    margin: var(--vertical-spacing) auto;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  h1 {
    font-size: 150%;
  }
</style>

<main>
  <nav class="title">
    <h1>Initiative Tracker</h1>

    <button on:click="{handleReset}">Reset</button>
  </nav>

  <PlayersList />

  <InitiativeInput />
</main>
