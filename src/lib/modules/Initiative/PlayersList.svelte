<script lang="ts">
  import liveQuery from "$lib/data/liveQuery";
  import IconTrash from "$lib/icons/IconTrash.svelte";
  import type { Player } from "$lib/types";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { getCurrentTurn } from "./battle";
  import { deletePlayer, editPlayer, getPlayers } from "./players";

  const players = liveQuery("players", getPlayers);
  const currentTurn = liveQuery("currentTurn", getCurrentTurn);

  function handleDelete(id: number) {
    return () => {
      if (!window.confirm("Are you sure?")) return;

      deletePlayer(id);
    };
  }

  function handleDamage(player: Player) {
    return (event: Event) => {
      const inputEl = <HTMLInputElement>event.target;
      const input = inputEl.value;

      if (!input.length) return;

      const value = input.slice(1, input.length);
      let damage = player.damage || 0;

      if (input.charAt(0) === "+") {
        damage += Number(value);
      }

      if (input.charAt(0) === "-") {
        damage -= Number(value);
      }

      editPlayer(player.id, { damage });
      inputEl.value = "";
    };
  }
</script>

{#if $players}
  <ul class="flex flex-col space-y-6">
    {#each $players as player, index (player.id)}
      <li
        class="relative flex sm:flex-col items-center sm:items-baseline justify-between p-3 rounded shadow-xl bg-gray-700"
        transition:fade|local={{ duration: 150 }}
        animate:flip
        class:currentTurn={index === $currentTurn}
        data-currentTurn={index === $currentTurn}
      >
        <p class="name">{player.initiative} - {player.name}</p>

        <div class="flex items-center sm:justify-between sm:mt-4">
          <p>Damage: {player.damage}</p>

          <div class="flex space-x-4 ml-4">
            <input class="u-input" on:change={handleDamage(player)} size="6" />

            <button
              class="sm:absolute sm:right-4 sm:top-1/2 sm:transform sm:-translate-y-1/2"
              on:click={handleDelete(player.id)}
              aria-label="Delete {player.name}"
            >
              <IconTrash />
            </button>
          </div>
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  .currentTurn {
    @apply bg-blue-700;
  }
</style>
