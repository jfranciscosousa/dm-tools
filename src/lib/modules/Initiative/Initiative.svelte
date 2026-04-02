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
  <main class="arcane-page flex flex-col h-screen px-8 py-6">
    <!-- Header -->
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="arcane-title text-lg">Initiative Tracker</h1>
        {#if $currentTurn >= 0}
          <div
            class="badge badge-sm"
            style="font-family: var(--font-serif); letter-spacing: 0.08em; background: oklch(16% 0.025 55); border-color: oklch(30% 0.04 55); color: oklch(72% 0.14 72);"
          >
            Round {$roundNumber}
          </div>
        {/if}
      </div>
      <button class="btn btn-sm btn-error btn-outline" onclick={handleReset}>Reset</button>
    </header>

    <div class="arcane-rule mt-4 mb-4"></div>

    <!-- Player list -->
    <div class="grow overflow-auto">
      <PlayerList />
    </div>

    <!-- Bottom controls -->
    <div class="flex flex-col gap-2 mt-5">
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
