<script lang="ts">
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";

  interface Props {
    prompt: string;
    loading?: boolean;
  }

  let { prompt = $bindable(), loading = $bindable(false) }: Props = $props();
</script>

<form
  method="POST"
  use:enhance={() => {
    loading = true;

    return async ({ update }) => {
      update();
      loading = false;
    };
  }}
>
  <Input
    name="prompt"
    label="Prompt"
    type="text"
    bind:value={prompt}
    placeholder="Use some keywords to describe this npc"
    disabled={loading}
  />
</form>
