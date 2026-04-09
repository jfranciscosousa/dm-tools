<script lang="ts">
  import liveQuery from "$lib/data/liveQuery";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { getCurrentTurn } from "./battle";
  import { getPlayers } from "./players";
  import PlayerCard from "./PlayerCard.svelte";

  const players = liveQuery("players", getPlayers);
  const currentTurn = liveQuery("currentTurn", getCurrentTurn);
</script>

{#if $players}
  <ul class="flex flex-col gap-2">
    {#each $players as player (player.id)}
      {@const active = player.id === $currentTurn}
      <li
        data-testid="player-listitem"
        class="border border-transparent transition-all duration-300"
        class:arcane-active={active}
        style="background: oklch(12% 0.02 55); border-color: oklch(22% 0.025 55);"
        transition:fade|local={{ duration: 150 }}
        animate:flip
        data-currentTurn={active}
      >
        <PlayerCard {player} {active} />
      </li>
    {/each}
  </ul>
{/if}
