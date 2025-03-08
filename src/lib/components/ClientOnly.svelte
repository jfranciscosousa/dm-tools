<script lang="ts">
  import { onMount, type Component } from "svelte";

  interface Props {
    impFn: () => Promise<{ default: Component }>;
    children?: import("svelte").Snippet;
  }

  let { impFn, children }: Props = $props();
  let component: Component | undefined = $state();

  onMount(async () => {
    component = (await impFn()).default;
  });
</script>

{#if component}
  {@const SvelteComponent = component}
  <SvelteComponent />
{:else}
  {@render children?.()}
{/if}
