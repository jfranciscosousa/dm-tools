<script lang="ts">
  import liveQuery from "$lib/data/liveQuery";
  import IconTrash from "$lib/icons/IconTrash.svelte";
  import type { Condition, Player } from "$lib/types";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { getCurrentTurn } from "./battle";
  import { parseConditionInput } from "./conditions";
  import { deletePlayer, editPlayer, getPlayers } from "./players";

  let {
    expiredConditions
  }: {
    expiredConditions: { playerName: string; labels: string[] } | null;
  } = $props();

  const players = liveQuery("players", getPlayers);
  const currentTurn = liveQuery("currentTurn", getCurrentTurn);

  function handleDelete(id: number) {
    return () => {
      if (!window.confirm("Are you sure?")) return;
      deletePlayer(id);
    };
  }

  function handleDamage(player: Player) {
    return (event: Event) => {
      const inputEl = event.target as HTMLInputElement;
      const input = inputEl.value;
      if (!input.length) return;

      const value = input.slice(1, input.length);
      let damage = player.damage || 0;

      if (input.charAt(0) === "+") damage += Number(value);
      if (input.charAt(0) === "-") damage -= Number(value);

      editPlayer(player.id, { damage });
      inputEl.value = "";
    };
  }

  function addCondition(player: Player, raw: string): void {
    const condition = parseConditionInput(raw);
    if (!condition) return;

    const duplicate = player.conditions.some((c: Condition) => c.label === condition.label);
    if (duplicate) return;

    editPlayer(player.id, { conditions: [...player.conditions, condition] });
  }

  function handleConditionChange(player: Player) {
    return (event: Event) => {
      const inputEl = event.target as HTMLInputElement;
      addCondition(player, inputEl.value);
      inputEl.value = "";
    };
  }

  function handleConditionKeydown(player: Player) {
    return (event: KeyboardEvent) => {
      if (event.key !== "," && event.key !== "Enter") return;
      event.preventDefault();
      const inputEl = event.target as HTMLInputElement;
      addCondition(player, inputEl.value);
      inputEl.value = "";
    };
  }

  function handleRemoveCondition(player: Player, label: string) {
    return () => {
      editPlayer(player.id, {
        conditions: player.conditions.filter((c: Condition) => c.label !== label)
      });
    };
  }

  function conditionLabel(condition: Condition): string {
    return condition.duration !== null
      ? `${condition.label} (${condition.duration})`
      : condition.label;
  }

  function getExpiredLabels(playerName: string): string[] {
    if (!expiredConditions || expiredConditions.playerName !== playerName) return [];
    return expiredConditions.labels;
  }
</script>

{#if $players}
  <ul class="flex flex-col gap-3">
    {#each $players as player, index (player.id)}
      {@const active = index === $currentTurn}
      {@const expired = getExpiredLabels(player.name)}
      <li
        data-testid="player-listitem"
        class="card card-sm bg-base-200 shadow border-2 border-transparent transition-colors"
        class:border-warning={active}
        class:shadow-lg={active}
        transition:fade|local={{ duration: 150 }}
        animate:flip
        data-currentTurn={active}
      >
        <div class="card-body p-4 gap-3">
          <!-- Header row -->
          <div class="flex items-center gap-2">
            <kbd class="kbd kbd-sm font-mono font-bold min-w-8 text-center">
              {player.initiative}
            </kbd>
            <p class="name font-semibold grow">
              {#if active}<span class="text-warning mr-1">▶</span>{/if}{player.name}
            </p>
            <button
              class="btn btn-ghost btn-xs opacity-50 hover:opacity-100"
              onclick={handleDelete(player.id)}
              aria-label="Delete {player.name}"
            >
              <IconTrash />
            </button>
          </div>

          <!-- Damage row -->
          <div class="flex items-center gap-2 h-7">
            <span class="text-xs opacity-50 uppercase tracking-wide leading-none">Damage</span>
            <span class="font-mono font-bold leading-none" class:text-error={player.damage > 0}>
              {player.damage}
            </span>
            <input
              class="input input-xs w-20 font-mono h-full"
              onchange={handleDamage(player)}
              placeholder="+5 / -3"
            />
          </div>

          <!-- Expired alert -->
          {#if expired.length > 0}
            <div
              role="alert"
              class="alert alert-warning alert-soft py-1.5 px-3 text-sm"
              transition:fade={{ duration: 200 }}
            >
              ⚠ {expired.join(", ")} expired
            </div>
          {/if}

          <!-- Conditions row -->
          <div class="flex flex-wrap items-center gap-1.5">
            {#each player.conditions as condition (condition.label)}
              <span
                class="badge badge-sm gap-0.5 items-center"
                class:badge-warning={condition.duration !== null}
                class:badge-ghost={condition.duration === null}
              >
                {conditionLabel(condition)}
                <button
                  onclick={handleRemoveCondition(player, condition.label)}
                  aria-label="Remove {condition.label}"
                  class="cursor-pointer px-1 py-0.5 text-xs opacity-60 hover:opacity-100"
                >×</button>
              </span>
            {/each}
            <input
              class="input input-xs w-24"
              name="condition"
              placeholder="+ condition"
              onchange={handleConditionChange(player)}
              onkeydown={handleConditionKeydown(player)}
            />
          </div>
        </div>
      </li>
    {/each}
  </ul>
{/if}
