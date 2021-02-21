<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { deletePlayer, editPlayer, players$ } from "root/data/players";
  import { currentTurn$ } from "root/data/battle";

  import TrashIcon from "./TrashIcon.svelte";

  function handleDelete(id: number) {
    return () => {
      if (!window.confirm("Are you sure?")) return;

      deletePlayer(id);
    };
  }

  function handleDamage(player: Player) {
    return (event: Event) => {
      const inputEl = <HTMLInputElement>event.target;
      const input = inputEl.value;

      if (!input.length) return;

      const value = input.slice(1, input.length);
      let damage = player.damage || 0;

      if (input.charAt(0) === "+") {
        damage += Number(value);
      }

      if (input.charAt(0) === "-") {
        damage -= Number(value);
      }

      editPlayer(player.id, { damage });
      inputEl.value = "";
    };
  }
</script>

<style>
  ul {
    width: 100%;
    margin: 2rem auto;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;

    border: 1px solid var(--border);
    border-radius: 6px;
  }

  li:not(:last-child) {
    margin-bottom: 1rem;
  }

  .name {
    width: 12rem;
  }

  .currentTurn {
    background-color: var(--selection);
    border: 1px solid var(--selection);
  }

  button {
    display: inline;
    padding: 0;
    margin: 0;

    background: none;
    border: none;
    cursor: pointer;
  }

  .actions {
    display: flex;
    gap: 8px;
  }
</style>

<ul>
  {#each $players$ as player, index (player.id)}
    <li
      transition:fade|local="{{ duration: 150 }}"
      animate:flip
      class:currentTurn="{index === $currentTurn$}">
      <p class="name">{player.initiative} - {player.name}</p>

      <p>Damage: {player.damage}</p>

      <div class="actions">
        <input on:change="{handleDamage(player)}" size="6" />

        <button on:click="{handleDelete(player.id)}">
          <TrashIcon />
        </button>
      </div>
    </li>
  {/each}
</ul>
