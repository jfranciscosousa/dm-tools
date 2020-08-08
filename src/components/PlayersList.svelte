<script>
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import players from "root/lib/players";

  function handleDelete(event) {
    const { id } = event.currentTarget.dataset;

    players.deletePlayer(id);
  }
</script>

<style>
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

<ul>
  {#each $players as player (player.id)}
    <li transition:fade="{{ key: player.id, duration: 150 }}" animate:flip>
      <button on:click="{handleDelete}" data-id="{player.id}">X</button>

      <p>{player.name} - {player.initiative}</p>
    </li>
  {/each}
</ul>
