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

<button class="mt-8 btn btn-lg btn-primary w-[200px]" onclick={handleCopy}>
  {#if copied}
    Copied!
  {:else}
    Copy to clipboard
  {/if}
</button>

<div class="mt-4 prose" bind:this={elementToCopy}>
  <!-- eslint-disable -->
  {@html data}
</div>
