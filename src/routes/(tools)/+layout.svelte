<div class="flex min-h-screen">
  <aside class="flex flex-col items-center px-6 py-12 border-r border-gray-600 min-h-full">
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
        <a class="btn btn-sm btn-primary w-36 text-center" href="/npc">NPC generator</a>
      </li>
    </ul>
  </aside>

  <div class="w-full">
    <slot />
  </div>
</div>
