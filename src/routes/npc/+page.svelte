<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData | undefined;

  let loading = false;
  let prompt = form?.prompt;
</script>

<main class="p-24">
  <h1 class="mb-40 text-3xl">NPC generator</h1>

  <form
    method="POST"
    use:enhance={() => {
      loading = true;

      return async ({ result, update }) => {
        update();
        loading = false;
      };
    }}
  >
    <Input
      name="prompt"
      label="Prompt"
      type="text"
      bind:value={prompt}
      placeholder="Use some keywords to describe this npc"
      disabled={loading}
    />
  </form>

  {#if form?.data && !loading}
    <div class="space-y-3 mt-8">
      <p>Name: {form.data.name}</p>
      <p>Alignment: {form.data.alignment}</p>
      <p>Race: {form.data.race}</p>
      <p>Class: {form.data.class}</p>
      <p>Subclass: {form.data.subclass}</p>
      <p>Background: {form.data.background}</p>
      <p>Background long: {form.data.backgroundLong}</p>
      <p>Appearance: {form.data.appearance}</p>
      <p>Personality traits: {form.data.personalityTraits}</p>
      <p>Ideals: {form.data.ideals}</p>
      <p>Bonds: {form.data.bonds}</p>
      <p>Flaws: {form.data.flaws}</p>
    </div>
  {/if}
</main>
