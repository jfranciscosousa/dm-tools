<script lang="ts">
  import players from "root/lib/playersStore";

  let playerName = "";
  let initiative = "";
  let inputRef;
  $: valid = playerName !== "" && initiative !== "";

  function handleSubmit() {
    players.add({ name: playerName, initiative: Number(initiative) });
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

  label {
    display: flex;
    flex-direction: column;
  }

  .playerName {
    flex-grow: 1;
  }

  .initiative {
    width: 15%;
    margin: 0 1rem;
  }
</style>

<form on:submit|preventDefault="{handleSubmit}">
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
