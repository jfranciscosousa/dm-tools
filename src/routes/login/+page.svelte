<script lang="ts">
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<main class="arcane-page w-screen h-screen flex flex-col items-center justify-center">
  <p
    style="font-family: var(--font-serif); font-size: 0.55rem; letter-spacing: 0.35em; text-transform: uppercase; color: oklch(50% 0.08 72); margin-bottom: 0.75rem;"
  >
    ✦ Restricted Access ✦
  </p>
  <h1 class="arcane-title text-2xl mb-2">DM Tools</h1>
  <div class="arcane-rule mb-8" style="width: 180px;"></div>

  <div class="arcane-panel" style="width: 420px;">
    <p class="arcane-label mb-4">Enter the passphrase</p>
    <form method="POST" class="flex flex-col gap-3">
      <div class="flex gap-2">
        <input
          type="password"
          name="inviteToken"
          class="input input-bordered grow"
          placeholder="········"
        />
        <button class="btn btn-primary">Enter</button>
      </div>

      {#if form?.error}
        <p class="text-error text-sm" style="font-family: var(--font-sans);">{form.error}</p>
      {/if}
    </form>
  </div>
</main>
