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

<ul class="flex flex-col space-y-6">
  {#each $players$ as player, index (player.id)}
    <li
      class="relative flex sm:flex-col items-center sm:items-baseline justify-between p-3 bg-gray-700 rounded shadow-xl"
      transition:fade|local="{{ duration: 150 }}"
      animate:flip
      class:currentTurn="{index === $currentTurn$}"
    >
      <p class="name">{player.initiative} - {player.name}</p>

      <div class="flex items-center sm:justify-between sm:mt-4">
        <p>Damage: {player.damage}</p>

        <div class="flex space-x-4 ml-4">
          <input class="u-input" on:change="{handleDamage(player)}" size="6" />

          <button
            class="sm:absolute sm:right-4 sm:top-1/2 sm:transform sm:-translate-y-1/2"
            on:click="{handleDelete(player.id)}"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  {/each}
</ul>
