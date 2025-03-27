<script lang="ts">
  import type { ActionData } from "./$types";

  interface Props {
    form: ActionData | undefined;
  }

  let { form }: Props = $props();
</script>

<form class="w-screen h-screen flex items-center justify-center" method="POST">
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 w-[520px]">
      <input type="password" name="inviteToken" class="input input-lg input-primary" />
      <button class="btn btn-lg btn-primary">Login</button>
    </div>

    {#if form?.error}
      <p class="text-error">{form.error}</p>
    {/if}
  </div>
</form>
