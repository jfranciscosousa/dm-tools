<script lang="ts">
  import liveQuery from "$lib/data/liveQuery";
  import { endBattle, getCurrentTurn, getRoundNumber, nextTurn } from "./battle";
  import { clearPlayers, getPlayers } from "./players";
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
  <main class="flex flex-col max-h-screen h-full p-24">
    <nav>
      <div class="flex justify-between">
        <h1 class="text-2xl">Initiative Tracker</h1>

        <button class="btn btn-error" onclick={handleReset}>Reset</button>
      </div>

      {#if $currentTurn >= 0}Round number: {$roundNumber}{/if}
    </nav>

    <div class="players grow my-12 overflow-auto">
      <PlayersList />
    </div>

    <div class="flex flex-col items-center">
      {#if $currentTurn >= 0}
        <button class="btn w-32" onclick={nextTurn}>Next turn</button>

        <button class="btn w-32 mt-4" onclick={endBattle}> End battle </button>
      {:else}
        <div class="w-full">
          <Input />
        </div>

        <button class="btn btn-primary mt-4" onclick={nextTurn}>Start battle</button>
      {/if}
    </div>
  </main>
{/if}
