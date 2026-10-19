<script lang="ts">
  import type { Snippet } from 'svelte';
  import { initLocale } from '$/util/i18n.svelte';
  import { onMount } from 'svelte';
  import '../app.css';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  onMount(initLocale);
</script>

{@render children()}
