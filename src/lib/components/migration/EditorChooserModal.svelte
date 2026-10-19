<script lang="ts">
  import McWrapper from '$/components/McWrapper.svelte';
  import MermaidChartIcon from '$/components/MermaidChartIcon.svelte';
  import PrivacyPolicyLink from '$/components/migration/PrivacyPolicyLink.svelte';
  import { Button } from '$/components/ui/button';
  import * as Dialog from '$/components/ui/dialog';
  import { dismissEditorChooser } from '$/util/migration/domainMigration';
  import type { Component } from 'svelte';
  import AtlassianIcon from '~icons/logos/atlassian';
  import AmazonIcon from '~icons/logos/aws';
  import GoogleIcon from '~icons/logos/google';
  import MicrosoftIcon from '~icons/logos/microsoft';
  import { createEditorChooserActions } from './editorChooserActions';
  import { t } from '$/util/i18n.svelte';

  interface Props {
    open: boolean;
  }

  let { open = $bindable() }: Props = $props();
  // Tracks whether the current close was triggered by an explicit action
  // (button click logs its own event) vs. implicit dismissal (ESC/click-outside).
  let handled = false;
  const actions = createEditorChooserActions(() => {
    handled = true;
    open = false;
  });

  const features = $derived([
    { title: t('migration.aiTitle'), description: t('migration.aiDescription') },
    {
      title: t('migration.visualTitle'),
      description: t('migration.visualDescription')
    },
    {
      title: t('migration.storageTitle'),
      description: t('migration.storageDescription')
    },
    {
      title: t('migration.teamTitle'),
      description: t('migration.teamDescription')
    }
  ]);

  const trustedLogos: { name: string; icon: Component }[] = [
    { name: 'Google', icon: GoogleIcon },
    { name: 'Microsoft', icon: MicrosoftIcon },
    { name: 'Atlassian', icon: AtlassianIcon },
    { name: 'Amazon', icon: AmazonIcon }
  ];
</script>

<Dialog.Root
  bind:open
  onOpenChange={(v) => {
    if (v) return;
    if (!handled) actions.log('dismissed');
    handled = false;
    dismissEditorChooser();
  }}>
  <Dialog.Content class="flex max-w-lg flex-col gap-3 bg-background p-8">
    <Dialog.Header class="flex-col items-start gap-2 space-y-0 text-left sm:text-left">
      <MermaidChartIcon class="size-10" />
      <Dialog.Title class="pt-2 text-2xl font-bold">{t('migration.title')}</Dialog.Title>
      <Dialog.Description class="text-xs font-light text-muted-foreground">
        {t('migration.subtitle')}
      </Dialog.Description>
    </Dialog.Header>

    <ul class="mt-2 flex flex-col gap-3">
      {#each features as feature (feature.title)}
        <li class="flex items-center gap-3 rounded-lg border border-border p-3">
          <span class="size-2 shrink-0 rounded-full bg-accent"></span>
          <div class="flex flex-col gap-0.5">
            <p class="text-xs">{feature.title}</p>
            <p class="text-xs font-light text-muted-foreground">{feature.description}</p>
          </div>
        </li>
      {/each}
    </ul>

    <div class="mt-2 flex items-center gap-3">
      <McWrapper labelPrefix="Opens ">
        <Button variant="accent" onclick={() => actions.startTrial()}
          >{t('migration.startTrial')}</Button>
      </McWrapper>
      <Button variant="outline" onclick={() => actions.dismiss('stayOnLive')}>
        {t('migration.stay')}
      </Button>
    </div>

    <div class="mt-3 flex flex-col items-start gap-4">
      <p class="text-xs">{t('migration.trusted')}</p>
      <div class="flex w-full items-center justify-between gap-2">
        {#each trustedLogos as logo (logo.name)}
          <logo.icon class="h-6 w-auto grayscale" aria-label={logo.name} />
        {/each}
      </div>
    </div>

    <PrivacyPolicyLink />
  </Dialog.Content>
</Dialog.Root>
