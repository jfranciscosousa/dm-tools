<script lang="ts">
  import type { Npc } from "./generateNpc";

  export let npc: Npc;
</script>

<div class="space-y-3 mt-8">
  <p>Name: {npc.name}</p>
  <p>Alignment: {npc.alignment}</p>
  <p>Race: {npc.race}</p>
  <p>Class: {npc.class}</p>
  <p>Subclass: {npc.subclass}</p>
  <p>Background: {npc.background}</p>
  <p>Background long: {npc.backgroundLong}</p>
  <p>Appearance: {npc.appearance}</p>
  <p>Personality traits: {npc.personalityTraits}</p>
  <p>Ideals: {npc.ideals}</p>
  <p>Bonds: {npc.bonds}</p>
  <p>Flaws: {npc.flaws}</p>
</div>
