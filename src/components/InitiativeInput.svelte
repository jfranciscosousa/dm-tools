<script>
  import players from "root/lib/players";

  let playerName = "";
  let initiative = "";
  let inputRef;
  $: valid = playerName !== "" && initiative !== "";

  function handleSubmit() {
    players.addPlayer({ name: playerName, initiative });
    playerName = "";
    initiative = "";

    inputRef.focus();
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: row;
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

  button {
    width: 10%;
  }
</style>

<form on:submit|preventDefault="{handleSubmit}">
  <label class="playerName">
    Player
    <input name="playerName" bind:value="{playerName}" bind:this="{inputRef}" />
  </label>

  <label class="initiative">
    Initiative
    <input name="iniative" type="number" bind:value="{initiative}" />
  </label>

  <button type="submit" disabled="{!valid}">Submit</button>
</form>
