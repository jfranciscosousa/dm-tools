<script>
  import { actions } from "root/lib/players";
  import InitiativeInput from "./InitiativeInput.svelte";
  import PlayersList from "./PlayersList.svelte";
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 2rem);
    max-width: 40em;
    margin: 1rem auto;
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>

<main>
  <div class="title">
    <h1>Initiative Tracker</h1>

    <button on:click="{actions.resetPlayers}">Reset</button>
  </div>

  <PlayersList />

  <InitiativeInput />
</main>
