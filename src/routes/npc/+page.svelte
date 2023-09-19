<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";
  import NpcDescription from "$lib/modules/Npc/NpcDescription.svelte";
  import NpcForm from "$lib/modules/Npc/NpcForm.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData | undefined;

  let loading = false;
  let prompt = form?.prompt || "";
</script>

<main class="p-24">
  <h1 class="mb-8 text-3xl">NPC generator</h1>

  <NpcForm {prompt} />

  {#if form?.data && !loading}
    <NpcDescription npc={form?.data} />
  {:else if loading}
    <div class="flex justify-center items-center mt-10">
      <div class="loading w-12" />
    </div>
  {/if}
</main>
