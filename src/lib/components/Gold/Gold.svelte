<!-- @hmr:keep-all -->
<script lang="ts">
  import Input from "./Input.svelte";

  let copper = 0;
  let silver = 0;
  let gold = 0;
  let electrum = 0;
  let platinum = 0;

  function simplify(
    copper: number,
    silver: number,
    gold: number,
    electrum: number,
    platinum: number
  ) {
    const valueInGold =
      Number(copper) / 100 +
      Number(silver) / 10 +
      Number(gold) +
      Number(electrum) / 2 +
      Number(platinum) * 10;
    const valueInPlat = valueInGold / 10;
    const [total = "", decimal = ""] = valueInPlat.toString().split(".");

    return {
      platinum: Number(total),
      gold: Number(decimal[0] || 0),
      silver: Number(decimal[1] || 0),
      copper: Number(decimal[2] || 0)
    };
  }

  $: total = simplify(copper, silver, gold, electrum, platinum);
</script>

<main class="p-24 ">
  <h1 class="mb-40 text-3xl">Gold Simplifier</h1>

  <div class="grid grid-cols-2 gap-3">
    <Input label="Copper" bind:value={copper} />
    <Input label="Silver" bind:value={silver} />
    <Input label="Gold" bind:value={gold} />
    <Input label="Electrum" bind:value={electrum} />
    <Input label="Platinum" bind:value={platinum} />
  </div>

  <div class="mt-8">
    Total: {total.platinum} platinum | {total.gold} gold | {total.silver} silver | {total.copper} copper
  </div>
</main>
