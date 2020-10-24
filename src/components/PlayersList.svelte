<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import players from "root/lib/playersStore";
  import generateCssVariable from "root/lib/generateCssVariables";
  import TrashIcon, { TRASH_ICON_SIZE } from "./TrashIcon.svelte";

  const cssVariables = generateCssVariable({
    trashIconSize: `${-TRASH_ICON_SIZE}px`,
  });

  function handleDelete(id) {
    return () => {
      if (!window.confirm("Are you sure?")) return;

      players.delete(id);
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

    margin: 1rem 0;
  }

  li:not(:last-child) {
    padding-bottom: 1rem;

    border-bottom: 1px grey solid;
  }

  button {
    padding: 0;

    background: none;
    border: none;
    cursor: pointer;
  }
</style>

<ul {...cssVariables}>
  {#each $players as player (player.id)}
    <li transition:fade="{{ duration: 150 }}" animate:flip>

      <p>{player.name} - {player.initiative}</p>

      <button on:click="{handleDelete(player.id)}">
        <TrashIcon />
      </button>
    </li>
  {/each}
</ul>
