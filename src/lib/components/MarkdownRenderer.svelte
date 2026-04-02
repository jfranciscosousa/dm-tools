<script lang="ts">
  type Props = {
    data: string;
  };

  let { data }: Props = $props();
  let copied = $state(false);
  let elementToCopy: HTMLElement;

  function handleCopy() {
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([elementToCopy.innerText], { type: "text/plain" }),
      "text/html": new Blob([elementToCopy.outerHTML], { type: "text/html" })
    });
    navigator.clipboard.write([clipboardItem]);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1000);
  }
</script>

<div class="mt-6">
  <button
    class="btn btn-primary btn-outline btn-sm mb-6"
    onclick={handleCopy}
    style="min-width: 160px;"
  >
    {#if copied}Copied!{:else}Copy to Clipboard{/if}
  </button>

  <div class="prose max-w-none" bind:this={elementToCopy}>
    <!-- eslint-disable -->
    {@html data}
  </div>
</div>
