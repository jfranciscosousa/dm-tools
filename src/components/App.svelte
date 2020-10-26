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
    flex-direction: column;
  }

  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 150%;
  }

  .players {
    flex-grow: 1;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .actions > * + * {
    margin-top: 1rem;
  }
</style>

<main>
  <nav>
    <div class="title-row">
      <h1>Initiative Tracker</h1>

      <button on:click="{handleReset}">Reset</button>
    </div>

    {#if $players.currentTurn != null}Round number: {$players.roundNumber}{/if}
  </nav>

  <div class="players">
    <PlayersList />
  </div>

  <div class="actions">
    {#if $players.currentTurn != null}
      <button on:click="{players.nextTurn}">Next turn</button>

      <button on:click="{players.endBattle}">End battle</button>
    {:else}
      <InitiativeInput />

      <button on:click="{players.nextTurn}">Start battle</button>
    {/if}
  </div>
</main>
