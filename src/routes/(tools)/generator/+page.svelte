<script lang="ts">
  import GenAiForm from "$lib/components/GenAiForm.svelte";
  import MarkdownRenderer from "$lib/components/MarkdownRenderer.svelte";
  import { capitalize } from "lodash-es";
  import type { PageProps } from "./$types";

  let { form, data }: PageProps = $props();

  let loading: boolean = $state(false);
  let prompt = form?.prompt || "";
</script>

<main class="p-24">
  <h1 class="mb-8 text-3xl">{capitalize(data.variant)} generator</h1>

  <GenAiForm {prompt} bind:loading />

  {#if form?.data && !loading}
    <MarkdownRenderer data={form.data} />
  {:else if loading}
    <div class="flex justify-center items-center mt-10">
      <div class="loading w-12"></div>
    </div>
  {/if}
</main>
