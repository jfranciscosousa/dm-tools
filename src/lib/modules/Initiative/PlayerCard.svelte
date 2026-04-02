<script lang="ts">
  import IconTrash from "$lib/icons/IconTrash.svelte";
  import type { Condition, Player } from "$lib/types";
  import { fade } from "svelte/transition";
  import liveQuery from "$lib/data/liveQuery";
  import { getExpiredConditions } from "./battle";
  import { parseConditionInput } from "./conditions";
  import { deletePlayer, editPlayer } from "./players";

  let {
    player,
    active
  }: {
    player: Player;
    active: boolean;
  } = $props();

  const expiredConditions = liveQuery("expiredConditions", getExpiredConditions);
  const expired = $derived(
    $expiredConditions?.playerName === player.name ? $expiredConditions.labels : []
  );

  let editing = $state(false);

  function handleInitiativeClick() {
    editing = true;
  }

  function handleInitiativeKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      editPlayer(player.id, { initiative: Number(input.value) });
      editing = false;
    } else if (event.key === "Escape") {
      editing = false;
    }
  }

  function handleInitiativeBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    editPlayer(player.id, { initiative: Number(input.value) });
    editing = false;
  }

  function handleDelete() {
    if (!window.confirm("Are you sure?")) return;
    deletePlayer(player.id);
  }

  function handleDamage(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    const input = inputEl.value;
    if (!input.length) return;
    const value = input.slice(1, input.length);
    let damage = player.damage || 0;
    if (input.charAt(0) === "+") damage += Number(value);
    if (input.charAt(0) === "-") damage -= Number(value);
    editPlayer(player.id, { damage });
    inputEl.value = "";
  }

  function addCondition(raw: string): void {
    const condition = parseConditionInput(raw);
    if (!condition) return;
    const duplicate = player.conditions.some((c: Condition) => c.label === condition.label);
    if (duplicate) return;
    editPlayer(player.id, { conditions: [...player.conditions, condition] });
  }

  function handleConditionChange(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    addCondition(inputEl.value);
    inputEl.value = "";
  }

  function handleConditionKeydown(event: KeyboardEvent) {
    if (event.key !== "," && event.key !== "Enter") return;
    event.preventDefault();
    const inputEl = event.target as HTMLInputElement;
    addCondition(inputEl.value);
    inputEl.value = "";
  }

  function handleRemoveCondition(label: string) {
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
</script>

<div class="px-4 py-3 flex flex-col gap-2.5">
  <!-- Header row: initiative chip + name + delete -->
  <div class="flex items-center gap-3">
    {#if editing}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        type="number"
        class="input input-xs w-14 text-center font-mono font-bold"
        style="height: 2.25rem;"
        value={player.initiative}
        autofocus
        onkeydown={handleInitiativeKeydown}
        onblur={handleInitiativeBlur}
      />
    {:else}
      <button
        class="arcane-init-chip"
        class:active
        onclick={handleInitiativeClick}
        aria-label="Edit initiative for {player.name}"
        style={active ? "border-color: oklch(72% 0.14 72 / 0.6); color: oklch(72% 0.14 72);" : ""}
      >
        {player.initiative}
      </button>
    {/if}

    <p
      class="name grow font-semibold truncate"
      style="font-family: var(--font-sans); font-size: 1rem; color: {active
        ? 'oklch(83% 0.03 80)'
        : 'oklch(75% 0.025 70)'};"
    >
      {#if active}<span style="color: oklch(72% 0.14 72); margin-right: 0.3rem;">▶</span
        >{/if}{player.name}
    </p>

    <button
      class="btn btn-ghost btn-xs opacity-40 hover:opacity-90"
      onclick={handleDelete}
      aria-label="Delete {player.name}"
    >
      <IconTrash />
    </button>
  </div>

  <!-- Damage row -->
  <div class="flex items-center gap-3">
    <span class="arcane-label">Damage</span>
    <span
      class="font-mono font-bold text-sm leading-none"
      style="color: {player.damage > 0 ? 'oklch(60% 0.18 22)' : 'oklch(55% 0.025 65)'};"
    >
      {player.damage}
    </span>
    <input
      class="input input-xs w-24 font-mono"
      style="height: 1.6rem;"
      onchange={handleDamage}
      placeholder="+5 / -3"
    />
  </div>

  <!-- Expired conditions alert -->
  {#if expired.length > 0}
    <div
      role="alert"
      class="alert alert-warning alert-soft py-1 px-2.5 text-xs"
      transition:fade={{ duration: 200 }}
    >
      ⚠ {expired.join(", ")} expired
    </div>
  {/if}

  <!-- Conditions row -->
  {#if player.conditions.length > 0 || true}
    <div class="flex flex-wrap items-center gap-1.5">
      {#each player.conditions as condition (condition.label)}
        <span
          class="badge badge-xs items-center gap-0.5"
          class:badge-warning={condition.duration !== null}
          class:badge-ghost={condition.duration === null}
        >
          {conditionLabel(condition)}
          <button
            onclick={handleRemoveCondition(condition.label)}
            aria-label="Remove {condition.label}"
            class="cursor-pointer px-0.5 opacity-60 hover:opacity-100">×</button
          >
        </span>
      {/each}
      <input
        class="input input-xs w-24"
        style="height: 1.4rem; font-size: 0.62rem;"
        name="condition"
        placeholder="+ condition"
        onchange={handleConditionChange}
        onkeydown={handleConditionKeydown}
      />
    </div>
  {/if}
</div>
