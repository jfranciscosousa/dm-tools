<script lang="ts">
  import db from "root/lib/db";
  import InitiativeInput from "./InitiativeInput.svelte";
  import PlayersList from "./PlayersList.svelte";

  const currentTurn = db.useQuery(async () => {
    const setting = await db.settings.where({ key: "currentTurn" }).first();

    return setting?.value;
  });
  const roundNumber = db.useQuery(async () => {
    const setting = await db.settings.where({ key: "roundNumber" }).first();

    return setting?.value;
  });
  const players = db.$players;

  async function nextTurn() {
    if ($currentTurn === undefined || $currentTurn === null) {
      db.settings.put({ key: "currentTurn", value: 0 });
      db.settings.put({ key: "roundNumber", value: 1 });
    } else db.settings.put({ key: "currentTurn", value: $currentTurn + 1 });

    if ($currentTurn === $players.length - 1) {
      db.settings.put({ key: "currentTurn", value: 0 });
      db.settings.put({ key: "roundNumber", value: $roundNumber + 1 });
    }
  }

  function endBattle() {
    db.settings.put({ key: "currentTurn", value: undefined });
    db.settings.put({ key: "roundNumber", value: undefined });
  }

  function handleReset() {
    if (!window.confirm("Are you sure?")) return;

    db.players.clear();
    db.settings.clear();
  }
</script>

<style>
  main {
    --vertical-spacing: 2.5rem;

    display: flex;
    flex-direction: column;
    height: calc(100vh - calc(var(--vertical-spacing) * 2));
    max-width: 40em;
    padding: 0 2rem;
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

  .actions > button:last-child {
    margin-top: 1rem;
  }
</style>

{#if $players}
  <main>
    <nav>
      <div class="title-row">
        <h1>Initiative Tracker</h1>

        <button on:click="{handleReset}">Reset</button>
      </div>

      {#if $currentTurn >= 0}Round number: {$roundNumber}{/if}
    </nav>

    <div class="players">
      <PlayersList />
    </div>

    <div class="actions">
      {#if $currentTurn >= 0}
        <button on:click="{nextTurn}">Next turn</button>

        <button on:click="{endBattle}">End battle</button>
      {:else}
        <InitiativeInput />

        <button on:click="{nextTurn}">Start battle</button>
      {/if}
    </div>
  </main>
{/if}
