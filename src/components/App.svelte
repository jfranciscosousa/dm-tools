<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Loadable from "svelte-loadable";
</script>

<Router>
  <Route path="/initiative">
    <Loadable loader="{() => import('./Initiative/index.svelte')}" />
  </Route>

  <Route path="/">
    <main class="flex flex-col items-center">
      <h1 class="mb-40 text-3xl">DM tools</h1>

      <Link class="u-button" to="/initiative">Initiative Tracker</Link>
    </main>
  </Route>
</Router>
