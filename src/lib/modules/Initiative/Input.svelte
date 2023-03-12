<script lang="ts">
  import { addPlayer } from "./players";

  let playerName = "";
  let initiative = "";
  let inputRef: HTMLInputElement;
  $: valid = playerName !== "" && initiative !== "";

  async function handleSubmit() {
    await addPlayer({
      name: playerName,
      initiative: Number(initiative),
      damage: 0
    });
    playerName = "";
    initiative = "";

    inputRef.focus();
  }
</script>

<form
  class="flex items-end space-x-4 sm:flex-wrap"
  on:submit|preventDefault={handleSubmit}
  autocomplete="off"
>
  <label class="flex-grow flex flex-col">
    Player
    <input class="u-input w-full" name="playerName" bind:value={playerName} bind:this={inputRef} />
  </label>

  <label class="flex flex-col w-20">
    Initiative
    <input class="u-input" name="initiative" type="number" bind:value={initiative} />
  </label>

  <button class="u-button" type="submit" disabled={!valid}>Add</button>
</form>
