<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Loadable from "svelte-loadable";
</script>

<Router>
  <Route path="/initiative">
    <Loadable loader="{() => import('./Initiative/index.svelte')}" />
  </Route>

  <Route path="/encounter">
    <Loadable loader="{() => import('./Encounter/index.svelte')}" />
  </Route>

  <Route path="/">
    <main class="flex flex-col items-center">
      <h1 class="mb-40 text-3xl">DM tools</h1>

      <div class="flex flex-col items-center space-y-8">
        <Link class="u-button" to="/initiative">Initiative Tracker</Link>
        <Link class="u-button" to="/encounter">Encounter Calculator</Link>
      </div>
    </main>
  </Route>
</Router>
