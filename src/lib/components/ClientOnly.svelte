<script lang="ts">
  import { onMount } from "svelte";

  export let impFn: () => Promise<any>;
  let component: any;

  onMount(async () => {
    component = (await impFn()).default;
  });
</script>

{#if component}
  <svelte:component this={component} />
{:else}
  <slot />
{/if}
