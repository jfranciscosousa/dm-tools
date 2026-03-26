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
  <ul class="flex flex-col gap-3">
    {#each $players as player, index (player.id)}
      {@const active = index === $currentTurn}
      <li
        data-testid="player-listitem"
        class="card card-sm bg-base-200 shadow border-2 border-transparent transition-colors"
        class:border-warning={active}
        class:shadow-lg={active}
        transition:fade|local={{ duration: 150 }}
        animate:flip
        data-currentTurn={active}
      >
        <PlayerCard {player} {active} />
      </li>
    {/each}
  </ul>
{/if}
