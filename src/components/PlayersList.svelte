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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;

    border: 1px solid var(--border);
    border-radius: 6px;
  }

  li:not(:last-child) {
    margin-bottom: 1rem;
  }

  .currentTurn {
    background-color: var(--selection);
    border: 1px solid var(--selection);
  }

  button {
    display: inline;
    padding: 0;
    margin: 0;

    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<ul>
  {#each $playersStore.players as player, index (player.id)}
    <li
      transition:fade="{{ duration: 150 }}"
      animate:flip
      class:currentTurn="{index === $playersStore.currentTurn}">
      <p>{player.initiative} - {player.name}</p>

      <button on:click="{handleDelete(player.id)}">
        <TrashIcon />
      </button>
    </li>
  {/each}
</ul>
