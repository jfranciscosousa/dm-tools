<script lang="ts">
  import GenericGenAiRenderer from "./GenericGenAiRenderer.svelte";

  import { startCase } from "lodash-es";

  type Primitive = string | boolean | number;

  type GenericDataVal = Primitive | Primitive[] | GenericData | GenericData[];

  interface GenericData {
    [key: string]: GenericDataVal;
  }

  interface Props {
    data: GenericData;
    first?: boolean;
  }

  let { data, first = true }: Props = $props();
  let elementToCopy: HTMLElement;

  function handleCopy() {
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([elementToCopy.innerText], { type: "text/plain" }),
      "text/html": new Blob([elementToCopy.outerHTML], { type: "text/html" })
    });

    navigator.clipboard.write([clipboardItem]);
  }
</script>

{#if first}
  <button onclick={handleCopy}>Copy to clipboard</button>
{/if}

<div class="flex flex-col gap-2" bind:this={elementToCopy}>
  {#each Object.entries(data) as [key, value] (key)}
    <div>
      <b class="font-bold">{startCase(key)}:</b>

      {#if Array.isArray(value)}
        <ul class="list-disc pl-4">
          {#each value as entry (entry)}
            <li>
              {#if typeof entry === "object"}
                <GenericGenAiRenderer data={entry} first={false} />
              {:else}
                {entry}
              {/if}
            </li>
          {/each}
        </ul>
      {:else if typeof value === "object"}
        <div class="pl-4">
          <GenericGenAiRenderer data={value} first={false} />
        </div>
      {:else}
        {value}
      {/if}
    </div>
  {/each}
</div>
