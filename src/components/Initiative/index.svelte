<script lang="ts">
  import {
    currentTurn$,
    endBattle,
    nextTurn,
    roundNumber$,
  } from "root/data/battle";
  import { clearPlayers, players$ } from "root/data/players";
  import InitiativeInput from "./InitiativeInput.svelte";
  import PlayersList from "./PlayersList.svelte";

  async function handleReset() {
    if (!window.confirm("Are you sure?")) return;

    await endBattle();
    await clearPlayers();
  }
</script>

{#if $players$}
  <main class="flex flex-col">
    <nav>
      <div class="flex justify-between">
        <h1>Initiative Tracker</h1>

        <button class="u-button" on:click="{handleReset}">Reset</button>
      </div>

      {#if $currentTurn$ >= 0}Round number: {$roundNumber$}{/if}
    </nav>

    <div class="players flex-grow mt-12">
      <PlayersList />
    </div>

    <div class="flex flex-col items-center">
      {#if $currentTurn$ >= 0}
        <button class="u-button w-32" on:click="{nextTurn}">Next turn</button>

        <button class="u-button w-32 mt-4" on:click="{endBattle}"
          >End battle</button
        >
      {:else}
        <div class="w-full">
          <InitiativeInput />
        </div>

        <button class="u-button mt-4" on:click="{nextTurn}">Start battle</button
        >
      {/if}
    </div>
  </main>
{/if}
