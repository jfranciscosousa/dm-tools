<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import { addPlayer } from "./players";

  let playerName = "";
  let initiative = "";
  let inputRef: Input;
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
  <div class="grow">
    <Input label="Player" name="playerName" bind:value={playerName} bind:this={inputRef} />
  </div>

  <div class="w-20">
    <Input label="Initiative" name="initiative" type="number" bind:value={initiative} />
  </div>

  <button class="btn btn-primary" type="submit" disabled={!valid}>Add</button>
</form>
