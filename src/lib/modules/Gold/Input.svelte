<script lang="ts">
  export let value: number;
  export let label: string;
  export let name: string;
</script>

<label class="flex-grow flex flex-col">
  <span>{label}</span>
  <input {name} class="u-input" type="number" bind:value />
</label>
