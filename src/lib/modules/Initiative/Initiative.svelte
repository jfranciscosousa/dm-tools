<script lang="ts">
  import liveQuery from "$lib/data/liveQuery";
  import { endBattle, getCurrentTurn, getRoundNumber, nextTurn } from "./battle";
  import { clearPlayers, getPlayers } from "./players";
  import Input from "./Input.svelte";
  import PlayerList from "./PlayerList.svelte";

  const players = liveQuery("players", () => getPlayers());
  const currentTurn = liveQuery("currentTurn", () => getCurrentTurn());
  const roundNumber = liveQuery("roundNumber", () => getRoundNumber());

  async function handleNextTurn() {
    await nextTurn();
  }

  async function handleReset() {
    if (!window.confirm("Are you sure?")) return;
    await endBattle();
    await clearPlayers();
  }
</script>

{#if $players}
  <main class="flex flex-col h-screen px-10 py-6">
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold">Initiative Tracker</h1>
        {#if $currentTurn >= 0}
          <div class="badge badge-neutral badge-lg">Round {$roundNumber}</div>
        {/if}
      </div>
      <button class="btn btn-sm btn-error" onclick={handleReset}>Reset</button>
    </header>

    <div class="divider my-3"></div>

    <div class="grow overflow-auto">
      <PlayerList />
    </div>

    <div class="flex flex-col gap-2 mt-4">
      {#if $currentTurn >= 0}
        <button class="btn btn-primary btn-block" onclick={handleNextTurn}>Next turn</button>
        <button class="btn btn-outline btn-block" onclick={endBattle}>End battle</button>
      {:else}
        <Input />
        <button class="btn btn-primary btn-block mt-2" onclick={handleNextTurn}>
          Start battle
        </button>
      {/if}
    </div>
  </main>
{/if}
