<script lang="ts">
  import { endBattle, getCurrentTurn, getRoundNumber, nextTurn } from "root/data/battle";
  import liveQuery from "root/data/liveQuery";
  import { clearPlayers, getPlayers } from "root/data/players";
  import Input from "./Input.svelte";
  import PlayersList from "./PlayersList.svelte";

  const players = liveQuery("players", () => getPlayers());
  const currentTurn = liveQuery("currentTurn", () => getCurrentTurn());
  const roundNumber = liveQuery("roundNumber", () => getRoundNumber());

  async function handleReset() {
    if (!window.confirm("Are you sure?")) return;

    await endBattle();
    await clearPlayers();
  }
</script>

{#if $players}
  <main class="flex flex-col max-h-screen">
    <nav>
      <div class="flex justify-between">
        <h1 class="text-2xl">Initiative Tracker</h1>

        <button class="u-button" on:click="{handleReset}">Reset</button>
      </div>

      {#if $currentTurn >= 0}Round number: {$roundNumber}{/if}
    </nav>

    <div class="players flex-grow my-12 overflow-auto">
      <PlayersList />
    </div>

    <div class="flex flex-col items-center">
      {#if $currentTurn >= 0}
        <button class="u-button w-32" on:click="{nextTurn}">Next turn</button>

        <button class="u-button w-32 mt-4" on:click="{endBattle}">
          End battle
        </button>
      {:else}
        <div class="w-full">
          <Input />
        </div>

        <button class="u-button mt-4" on:click="{nextTurn}">
          Start battle
        </button>
      {/if}
    </div>
  </main>
{/if}
