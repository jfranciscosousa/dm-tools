<script lang="ts">
  import type { LayoutProps } from "./$types";
  import { page } from "$app/stores";

  let { children }: LayoutProps = $props();

  const navLinks = [
    { href: "/initiative", label: "Initiative" },
    { href: "/gold", label: "Gold" },
    { href: "/warfare", label: "Warfare" },
    { href: "/generator?variant=npc", label: "NPC Gen" },
    { href: "/generator?variant=tavern", label: "Tavern Gen" },
    { href: "/generator?variant=shop", label: "Shop Gen" }
  ];

  function isActive(href: string): boolean {
    const [path, query] = href.split("?");
    if ($page.url.pathname !== path) return false;
    if (!query) return true;
    return $page.url.search === "?" + query;
  }
</script>

<div class="flex min-h-screen">
  <!-- Sidebar -->
  <aside
    class="fixed flex flex-col items-center px-4 py-10 h-screen w-44"
    style="background: oklch(10% 0.018 55); border-right: 1px solid oklch(20% 0.025 55);"
  >
    <!-- Logo -->
    <a href="/" class="flex flex-col items-center gap-0 group">
      <span
        class="arcane-title text-base tracking-[0.15em] leading-tight group-hover:opacity-80 transition-opacity"
        >DM</span
      >
      <span
        class="arcane-title text-base tracking-[0.15em] leading-tight group-hover:opacity-80 transition-opacity"
        >Tools</span
      >
    </a>

    <!-- Decorative rule -->
    <div class="arcane-rule w-full mt-5 mb-6"></div>

    <!-- Nav -->
    <nav class="flex flex-col items-center gap-0.5 w-full">
      {#each navLinks as link (link.href)}
        <a href={link.href} class="arcane-nav-link w-full" class:active={isActive(link.href)}>
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Bottom ornament -->
    <div class="mt-auto flex flex-col items-center gap-3">
      <div class="arcane-rule w-full"></div>
      <span
        style="font-family: var(--font-serif); font-size: 0.5rem; letter-spacing: 0.2em; color: oklch(28% 0.025 55);"
        >✦ ✦ ✦</span
      >
    </div>
  </aside>

  <!-- Spacer -->
  <div class="w-44 shrink-0"></div>

  <!-- Content -->
  <div class="w-full min-w-0">
    {@render children?.()}
  </div>
</div>
