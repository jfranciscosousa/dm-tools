<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLSelectAttributes, "id" | "class"> {
    label: string;
    value?: string;
    name: string;
    options: { label: string; value: string }[];
    ref?: HTMLSelectElement;
  }

  let { value = $bindable(), label, name, options, ref, ...rest }: Props = $props();
</script>

<div class="w-full flex flex-col">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
  </label>

  <select
    {...rest}
    class="select select-bordered w-full"
    bind:value
    id={name}
    {name}
    bind:this={ref}
  >
    <option selected></option>

    {#each options as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>
