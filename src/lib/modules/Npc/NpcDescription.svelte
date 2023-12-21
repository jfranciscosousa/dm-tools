<script lang="ts">
  import { startCase } from "lodash-es";
  import type { Npc } from "./generateNpc";

  export let npc: Npc;
</script>

<div class="space-y-3 mt-8">
  {#each Object.entries(npc) as [key, value]}
    {#if key === "imageUrl" && value}
      <img src={npc.imageUrl} alt="{npc.name} portrait" />
    {:else}
      <p><span class="font-bold">{startCase(key)}:</span> {value}</p>
    {/if}
  {/each}
</div>
