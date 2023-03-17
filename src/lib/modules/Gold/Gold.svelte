<!-- @hmr:keep-all -->
<script lang="ts">
  import Input from "./Input.svelte";

  let copper = 0;
  let silver = 0;
  let gold = 0;
  let electrum = 0;
  let platinum = 0;

  function reset() {
    copper = 0;
    silver = 0;
    gold = 0;
    electrum = 0;
    platinum = 0;
  }

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
    const valueInPlat = (valueInGold / 10).toFixed(3);
    const [total = "", decimal = ""] = valueInPlat.toString().split(".");

    return {
      simplified: {
        platinum: Number(total),
        gold: Number(decimal[0] || 0),
        silver: Number(decimal[1] || 0),
        copper: Number(decimal[2] || 0)
      },
      totalInCopper: Number(valueInPlat) * 1000
    };
  }

  $: total = simplify(copper, silver, gold, electrum, platinum);
</script>

<main class="p-24 ">
  <h1 class="mb-40 text-3xl">Gold Simplifier</h1>

  <div class="grid grid-cols-2 gap-3">
    <Input name="copper" label="Copper" bind:value={copper} />
    <Input name="silver" label="Silver" bind:value={silver} />
    <Input name="gold" label="Gold" bind:value={gold} />
    <Input name="electrum" label="Electrum" bind:value={electrum} />
    <Input name="platinum" label="Platinum" bind:value={platinum} />
    <button class="u-button mt-auto" on:click={reset}>Reset</button>
  </div>

  <div class="mt-8">
    Total: {total.simplified.platinum} platinum | {total.simplified.gold} gold | {total.simplified
      .silver} silver | {total.simplified.copper} copper
  </div>

  <div class="mt-2">Total in copper: {total.totalInCopper}</div>
</main>
