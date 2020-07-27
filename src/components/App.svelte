<script>
  import players from "root/lib/players";
  import InitiativeInput from "./InitiativeInput.svelte";

  function handleDelete(event) {
    const { id } = event.currentTarget.dataset;

    players.deletePlayer(id);
  }
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

  h1 {
    font-size: 2.5rem;
  }

  ul {
    margin: 1rem 0;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem 0;

    & button {
      margin-right: 1rem;
    }
  }
</style>

<main>
  <div class="title">
    <h1>Initiative Tracker</h1>

    <button on:click="{players.resetPlayers}">Reset</button>
  </div>

  <ul>
    {#each $players as player}
      <li>
        <button on:click="{handleDelete}" data-id="{player.id}">X</button>

        <p>{player.name} - {player.initiative}</p>
      </li>
    {/each}
  </ul>

  <InitiativeInput />
</main>
