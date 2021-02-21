<script lang="ts">
  import { addPlayer } from "root/data/players";

  let playerName = "";
  let initiative = "";
  let inputRef: HTMLInputElement;
  $: valid = playerName !== "" && initiative !== "";

  async function handleSubmit() {
    await addPlayer({
      name: playerName,
      initiative: Number(initiative),
      damage: 0,
    });
    playerName = "";
    initiative = "";

    inputRef.focus();
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;

    margin-top: auto;
  }

  @media (max-width: 600px) {
    form {
      flex-wrap: wrap;
    }
  }

  label {
    display: flex;
    flex-direction: column;
  }

  .playerName {
    flex-grow: 1;
    margin-right: 1rem;
  }

  .initiative {
    width: 80px;
  }
</style>

<form on:submit|preventDefault="{handleSubmit}" autocomplete="off">
  <label class="playerName">
    Player
    <input name="playerName" bind:value="{playerName}" bind:this="{inputRef}" />
  </label>

  <label class="initiative">
    Initiative
    <input name="initiative" type="number" bind:value="{initiative}" />
  </label>

  <div><button type="submit" disabled="{!valid}">Add</button></div>
</form>
