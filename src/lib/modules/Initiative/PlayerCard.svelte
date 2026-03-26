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

<div class="card-body p-4 gap-3">
  <!-- Header row -->
  <div class="flex items-center gap-2">
    {#if editing}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        type="number"
        class="input input-xs font-mono font-bold w-16 text-center"
        value={player.initiative}
        autofocus
        onkeydown={handleInitiativeKeydown}
        onblur={handleInitiativeBlur}
      />
    {:else}
      <kbd
        class="kbd kbd-sm font-mono font-bold min-w-8 text-center cursor-pointer hover:brightness-125"
        onclick={handleInitiativeClick}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && handleInitiativeClick()}
        aria-label="Edit initiative for {player.name}"
      >
        {player.initiative}
      </kbd>
    {/if}
    <p class="name font-semibold grow">
      {#if active}<span class="text-warning mr-1">▶</span>{/if}{player.name}
    </p>
    <button
      class="btn btn-ghost btn-xs opacity-50 hover:opacity-100"
      onclick={handleDelete}
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
      onchange={handleDamage}
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
          onclick={handleRemoveCondition(condition.label)}
          aria-label="Remove {condition.label}"
          class="cursor-pointer px-1 py-0.5 text-xs opacity-60 hover:opacity-100">×</button
        >
      </span>
    {/each}
    <input
      class="input input-xs w-24"
      name="condition"
      placeholder="+ condition"
      onchange={handleConditionChange}
      onkeydown={handleConditionKeydown}
    />
  </div>
</div>
