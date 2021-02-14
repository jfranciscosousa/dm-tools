<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import db from "root/lib/db";
  import TrashIcon from "./TrashIcon.svelte";

  const players = db.$players;

  const currentTurn = db.useQuery(async () => {
    const setting = await db.settings.where({ key: "currentTurn" }).first();

    return setting?.value;
  });

  function handleDelete(id) {
    return () => {
      if (!window.confirm("Are you sure?")) return;

      db.players.delete(id);
    };
  }

  function handleDamage(player) {
    return (event) => {
      const input = event.target.value;

      if (!input.length) return;

      const value = input.slice(1, input.length);
      let damage = player.damage || 0;

      if (input.charAt(0) === "+") {
        damage += Number(value);
      }

      if (input.charAt(0) === "-") {
        damage -= Number(value);
      }

      db.players.update(player.id, { damage });
      event.target.value = "";
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
  {#each $players as player, index (player.id)}
    <li
      transition:fade|local="{{ duration: 150 }}"
      animate:flip
      class:currentTurn="{index === $currentTurn}">
      <p class="name">{player.initiative} - {player.name}</p>
      <p>{player.damage}</p>

      <div class="actions">
        <input on:change="{handleDamage(player)}" size="6" />

        <button on:click="{handleDelete(player.id)}">
          <TrashIcon />
        </button>
      </div>
    </li>
  {/each}
</ul>
