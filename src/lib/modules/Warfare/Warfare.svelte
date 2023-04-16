<!-- @hmr:keep-all -->
<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import Select from "$lib/components/Select.svelte";
  import { UNIT_SIZES, UNIT_SIZES_OPTIONS, UNIT_TYPES, UNIT_TYPES_OPTIONS } from "./constants";

  let type: keyof typeof UNIT_TYPES;
  let size: keyof typeof UNIT_SIZES;
  let attack = "0";
  let power = "0";
  let morale = "0";
  let defense = "0";
  let toughness = "0";
  let traits = "0";

  $: cost =
    (Number(attack) +
      Number(power) +
      (Number(defense) - 10) +
      (Number(toughness) - 10) +
      Number(morale) * 2) *
      UNIT_TYPES[type]?.costModifier *
      UNIT_SIZES[size]?.costModifier *
      10 +
    30 +
    Number(traits);

  $: console.log(UNIT_TYPES[type]?.costModifier, UNIT_SIZES[size]?.costModifier);
  $: console.log(Number(attack) + Number(power) + Number(defense) + Number(toughness));
</script>

<main class="p-24">
  <h1 class="mb-20 text-3xl">Warfare calculator</h1>

  <div class="grid grid-cols-2 gap-4">
    <Select name="type" label="Unit Type" bind:value={type} options={UNIT_TYPES_OPTIONS} />
    <Input name="traits" label="Traits cost" type="number" bind:value={traits} />
    <Input name="attack" label="Attack" type="number" bind:value={attack} />
    <Input name="defense" label="Defense" type="number" bind:value={defense} />
    <Input name="power" label="Power" type="number" bind:value={power} />
    <Input name="toughness" label="Toughness" type="number" bind:value={toughness} />
    <Input name="morale" label="Morale" type="number" bind:value={morale} />
    <Select name="size" label="Unit Size" bind:value={size} options={UNIT_SIZES_OPTIONS} />
  </div>

  <p>Cost: {cost}</p>
</main>
