<script>
  import ClientOnly from "$lib/components/ClientOnly.svelte";
</script>

<svelte:head>
  <title>Initiative Tracker - DM Tools</title>
</svelte:head>

<ClientOnly impFn={() => import("$lib/modules/Initiative/Initiative.svelte")} />
