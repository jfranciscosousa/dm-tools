<script lang="ts">
  import { onMount, type ComponentType } from "svelte";

  export let impFn: () => Promise<{ default: ComponentType }>;
  let component: ComponentType;

  onMount(async () => {
    component = (await impFn()).default;
  });
</script>

{#if component}
  <svelte:component this={component} />
{:else}
  <slot />
{/if}
