<script lang="ts">
  export let value: number;
  export let label: string;
</script>

<label class="flex-grow flex flex-col">
  <span>{label}</span>
  <input class="u-input" name="playerName" type="number" bind:value />
</label>
