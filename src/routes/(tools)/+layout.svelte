<script lang="ts">
  import type { LayoutProps } from "./$types";

  let { children }: LayoutProps = $props();
</script>

<div class="flex min-h-screen">
  <aside class="fixed flex flex-col items-center px-6 py-12 border-r border-gray-600 h-screen w-48">
    <a href="/" class="whitespace-nowrap">DM Tools</a>

    <ul class="flex flex-col items-center gap-2 mt-8">
      <li class="contents">
        <a class="btn btn-sm btn-primary w-36 text-center" href="/initiative">Initiative Tracker</a>
      </li>
      <li class="contents">
        <a class="btn btn-sm btn-primary w-36 text-center" href="/gold">Gold Simplifier</a>
      </li>
      <li class="contents">
        <a class="btn btn-sm btn-primary w-36 text-center" href="/warfare">Warfare</a>
      </li>
      <li class="contents">
        <a class="btn btn-sm btn-primary w-36 text-center" href="/generator?variant=npc">
          NPC generator
        </a>
      </li>
      <li class="contents">
        <a class="btn btn-sm btn-primary w-36 text-center" href="/generator?variant=tavern">
          Tavern generator
        </a>
      </li>
      <li class="contents">
        <a class="btn btn-sm btn-primary w-36 text-center" href="/generator?variant=shop">
          Shop generator
        </a>
      </li>
    </ul>
  </aside>

  <div class="w-48"></div>

  <div class="w-full">
    {@render children?.()}
  </div>
</div>
