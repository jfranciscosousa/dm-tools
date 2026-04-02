<script lang="ts">
  import GenAiForm from "$lib/components/GenAiForm.svelte";
  import MarkdownRenderer from "$lib/components/MarkdownRenderer.svelte";
  import { capitalize } from "lodash-es";
  import type { PageProps } from "./$types";

  let { form, data }: PageProps = $props();

  let loading: boolean = $state(false);
  let prompt = $derived.by(() => form?.prompt || "");
</script>

<main class="arcane-page px-14 py-10 max-w-3xl">
  <header class="mb-8">
    <h1 class="arcane-title text-2xl">{capitalize(data.variant)} Generator</h1>
    <div class="arcane-rule mt-3" style="width: 160px;"></div>
  </header>

  <div class="arcane-panel mb-6">
    <p class="arcane-label mb-3">Describe what you seek</p>
    <GenAiForm {prompt} bind:loading />
  </div>

  {#if loading}
    <div class="flex flex-col items-center gap-4 mt-12">
      <div class="loading loading-dots w-10" style="color: oklch(72% 0.14 72);"></div>
      <p class="arcane-label">Consulting the arcane archives...</p>
    </div>
  {:else if form?.data}
    <MarkdownRenderer data={form.data} />
  {/if}
</main>
