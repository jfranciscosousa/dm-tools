<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  interface $$Props extends Omit<HTMLInputAttributes, "id" | "class"> {
    label: string;
    value: string;
    name: string;
    loading?: boolean;
  }

  export let value: string;
  export let label: string;
  export let name: string;
</script>

<div class="form-control w-full">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
  </label>

  <input {...$$props} class="input input-bordered" bind:value id={name} {name} />
</div>
