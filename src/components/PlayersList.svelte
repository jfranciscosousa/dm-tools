<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import players from "root/lib/players";
  import generateCssVariable from "root/lib/generateCssVariables";
  import TrashIcon, { TRASH_ICON_SIZE } from "./TrashIcon.svelte";

  const cssVariables = generateCssVariable({
    trashIconSize: `${-TRASH_ICON_SIZE}px`,
  });

  function handleDelete(id) {
    return () => players.delete(id);
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
  }

  button {
    padding: 0;
    margin-left: var(--trashIconSize);

    background: none;
    border: none;
    cursor: pointer;

    transform: translateX(-8px);
  }
</style>

<ul {...cssVariables}>
  {#each $players as player (player.id)}
    <li transition:fade="{{ duration: 150 }}" animate:flip>
      <button on:click="{handleDelete(player.id)}">
        <TrashIcon />
      </button>

      <p>{player.name} - {player.initiative}</p>
    </li>
  {/each}
</ul>
