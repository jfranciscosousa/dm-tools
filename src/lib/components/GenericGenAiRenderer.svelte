<script lang="ts">
  import { startCase } from "lodash-es";

  type GenericDataVal = string | string[] | GenericData | GenericData[];

  interface GenericData {
    [key: string]: GenericDataVal;
  }

  export let data: GenericData;

  $: console.log(data);
</script>

<div class="space-y-3 mt-8">
  {#each Object.entries(data) as [key, value]}
    <p>
      <span class="font-bold">{startCase(key)}:</span>

      {#if Array.isArray(value)}
        <ul class="list-disc pl-4">
          {#each value as entry}
            <li>
              {#if typeof entry === "object"}
                <svelte:self data={entry} />
              {:else}
                {entry}
              {/if}
            </li>
          {/each}
        </ul>
      {:else if typeof value === "object"}
        <svelte:self data={value} />
      {:else}
        {value}
      {/if}
    </p>
  {/each}
</div>
