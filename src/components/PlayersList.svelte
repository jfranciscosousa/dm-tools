<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import playersStore from "root/lib/playersStore";
  import TrashIcon from "./TrashIcon.svelte";

  function handleDelete(id) {
    return () => {
      if (!window.confirm("Are you sure?")) return;

      playersStore.delete(id);
    };
  }
</script>

<style>
  ul {
    width: 80%;
    margin: 2rem auto;
  }

  li {
    margin: 1rem 0;
  }

  li > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 0.5rem;
  }

  li:not(:last-child) {
    padding-bottom: 1rem;

    border-bottom: 1px grey solid;
  }

  .currentTurn {
    background-color: grey;
  }

  button {
    padding: 0;

    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<ul>
  {#each $playersStore.players as player, index (player.id)}
    <li transition:fade="{{ duration: 150 }}" animate:flip>
      <div class:currentTurn="{index === $playersStore.currentTurn}">
        <p>{player.name} - {player.initiative}</p>

        <button on:click="{handleDelete(player.id)}">
          <TrashIcon />
        </button>
      </div>
    </li>
  {/each}
</ul>
