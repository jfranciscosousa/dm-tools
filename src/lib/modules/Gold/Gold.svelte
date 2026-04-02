<!-- @hmr:keep-all -->
<script lang="ts">
  import Input from "$lib/components/Input.svelte";

  let copper = $state("0");
  let silver = $state("0");
  let gold = $state("0");
  let electrum = $state("0");
  let platinum = $state("0");

  function reset() {
    copper = "0";
    silver = "0";
    gold = "0";
    electrum = "0";
    platinum = "0";
  }

  function simplify(
    copper: string,
    silver: string,
    gold: string,
    electrum: string,
    platinum: string
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

  let total = $derived(simplify(copper, silver, gold, electrum, platinum));
</script>

<main class="arcane-page px-14 py-10 max-w-2xl">
  <header class="mb-10">
    <h1 class="arcane-title text-2xl">Gold Simplifier</h1>
    <div class="arcane-rule mt-3" style="width: 160px;"></div>
  </header>

  <!-- Input grid -->
  <div class="grid grid-cols-2 gap-4 mb-6">
    <Input name="copper" label="Copper" bind:value={copper} />
    <Input name="silver" label="Silver" bind:value={silver} />
    <Input name="gold" label="Gold" bind:value={gold} />
    <Input name="electrum" label="Electrum" bind:value={electrum} />
    <Input name="platinum" label="Platinum" bind:value={platinum} />
    <div class="flex items-end">
      <button class="btn btn-error btn-outline w-full" onclick={reset}>Reset</button>
    </div>
  </div>

  <!-- Result panel -->
  <div class="arcane-panel mt-8">
    <p class="arcane-label mb-4">Simplified Value</p>
    <div class="grid grid-cols-4 gap-4">
      {#each [{ label: "Platinum", value: total.simplified.platinum }, { label: "Gold", value: total.simplified.gold }, { label: "Silver", value: total.simplified.silver }, { label: "Copper", value: total.simplified.copper }] as coin (coin.label)}
        <div class="flex flex-col gap-1">
          <span class="arcane-label">{coin.label}</span>
          <span class="arcane-stat">{coin.value}</span>
        </div>
      {/each}
    </div>
    <div class="arcane-rule mt-5 mb-4"></div>
    <div class="flex items-center gap-3">
      <span class="arcane-label">Total in copper</span>
      <span class="arcane-stat">{total.totalInCopper}</span>
    </div>
  </div>
</main>
