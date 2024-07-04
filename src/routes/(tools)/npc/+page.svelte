<script lang="ts">
  import GenericGenAiRenderer from "$lib/components/GenericGenAiRenderer.svelte";
  import NpcForm from "$lib/modules/Npc/NpcForm.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData | undefined;

  let loading: boolean;
  let prompt = form?.prompt || "";
</script>

<main class="p-24">
  <h1 class="mb-8 text-3xl">NPC generator</h1>

  <NpcForm {prompt} bind:loading />

  {#if form?.data && !loading}
    <GenericGenAiRenderer data={form?.data} />
  {:else if loading}
    <div class="flex justify-center items-center mt-10">
      <div class="loading w-12" />
    </div>
  {/if}
</main>
