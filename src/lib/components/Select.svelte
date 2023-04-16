<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  interface $$Props extends Omit<HTMLSelectAttributes, "id" | "class"> {
    label: string;
    value: string;
    name: string;
    options: { label: string; value: string }[];
  }

  export let value: string;
  export let label: string;
  export let name: string;
  export let options: { label: string; value: string }[];
</script>

<div class="form-control w-full max-w-xs">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
  </label>

  <select {...$$props} class="select select-bordered" bind:value id={name} {name}>
    <option selected />

    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>
