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
  }

  let { data }: Props = $props();
</script>

<div class="space-y-1" data-node>
  {#each Object.entries(data) as [key, value] (key)}
    <span>
      <span class="font-bold">{startCase(key)}:</span>

      {#if Array.isArray(value)}
        <ul class="list-disc pl-4">
          {#each value as entry (entry)}
            <li>
              {#if typeof entry === "object"}
                <GenericGenAiRenderer data={entry} />
              {:else}
                {entry}
              {/if}
            </li>
          {/each}
        </ul>
      {:else if typeof value === "object"}
        <div class="pl-4">
          <GenericGenAiRenderer data={value} />
        </div>
      {:else}
        {value}
      {/if}
    </span>
  {/each}
</div>
