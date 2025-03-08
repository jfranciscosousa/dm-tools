<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "id" | "class"> {
    label: string;
    value?: string;
    name: string;
    ref?: HTMLInputElement;
  }

  let { label, value = $bindable(), name, ref = $bindable(), ...rest }: Props = $props();
</script>

<div class="w-full flex flex-col">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
  </label>

  <input
    {...rest}
    class="input input-bordered w-full"
    bind:value
    id={name}
    {name}
    bind:this={ref}
  />
</div>
