<script lang="ts">
  import Input from "$lib/components/Input.svelte";
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
      damage: 0
    });
    playerName = "";
    initiative = "";

    inputRef?.focus();
  };
</script>

<form class="flex items-end space-x-4 sm:flex-wrap" onsubmit={handleSubmit} autocomplete="off">
  <div class="grow">
    <Input label="Player" name="playerName" bind:value={playerName} bind:ref={inputRef} />
  </div>

  <div class="w-20">
    <Input label="Initiative" name="initiative" type="number" bind:value={initiative} />
  </div>

  <button class="btn btn-primary" type="submit" disabled={!valid}>Add</button>
</form>
