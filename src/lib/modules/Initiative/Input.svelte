<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import { addPlayer } from "./players";

  let playerName = $state("");
  let initiative = $state("");
  let inputRef: HTMLInputElement | undefined = $state();
  let valid = $derived(playerName !== "" && initiative !== "");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await addPlayer({
      name: playerName,
      initiative: Number(initiative),
      damage: 0,
      conditions: []
    });
    playerName = "";
    initiative = "";
    inputRef?.focus();
  };
</script>

<form class="join w-full" onsubmit={handleSubmit} autocomplete="off">
  <input
    class="input input-bordered join-item grow"
    style="font-family: var(--font-sans);"
    name="playerName"
    placeholder="Combatant name"
    bind:value={playerName}
    bind:this={inputRef}
  />
  <input
    class="input input-bordered join-item w-20 font-mono"
    name="initiative"
    type="number"
    placeholder="Init"
    bind:value={initiative}
  />
  <button class="btn btn-primary join-item" type="submit" disabled={!valid}>Add</button>
</form>
