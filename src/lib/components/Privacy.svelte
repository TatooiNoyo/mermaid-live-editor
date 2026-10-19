<script lang="ts">
  import ExternalLinkWrapper from '$/components/ExternalLinkWrapper.svelte';
  import * as Dialog from '$/components/ui/dialog';
  import { env } from '$/util/env';
  import { isOnMermaidLive } from '$/util/migration/domainMigration';
  import ShieldIcon from '~icons/material-symbols/shield-lock-outline-rounded';
  import { t } from '$/util/i18n.svelte';
</script>

{#if env.privacyPolicyUrl}
  <a href={env.privacyPolicyUrl} target="_blank">
    <ShieldIcon />
  </a>
{:else}
  <Dialog.Root>
    <Dialog.Trigger>
      <ShieldIcon />
    </Dialog.Trigger>
    <Dialog.Content class="max-h-full overflow-hidden overflow-y-auto p-12">
      <Dialog.Header>
        <Dialog.Title class="flex items-center gap-2 text-xl">
          <ShieldIcon class="size-8 text-green-700" />
          {t('privacy.title')}
        </Dialog.Title>
      </Dialog.Header>

      {#if isOnMermaidLive()}
        <p class="text-xl font-semibold">{t('privacy.browserOnly')}</p>
        <p>{t('privacy.storage')}</p>
        <p>
          {t('privacy.openSourceBefore')}
          <a
            href="https://github.com/mermaid-js/mermaid-live-editor/deployments"
            class="underline"
            target="_blank">GitHub Pages</a>
          {t('privacy.openSourceAfter')}
          <a href="https://web.dev/explore/progressive-web-apps" target="_blank"
            >Progressive Web App</a
          >.
        </p>
        <p>
          {t('privacy.analyticsBefore')}
          <a href="https://p.mermaid.live/mermaid.live" class="underline" target="_blank"
            >{t('privacy.public')}</a
          >.
        </p>
        <ExternalLinkWrapper domain="example.com" isVisible>
          <p class="text-left">
            {t('privacy.external')}
          </p>
        </ExternalLinkWrapper>
      {:else}
        <p>{t('privacy.notConfigured')}</p>
        <p>
          {t('privacy.selfHostedBefore')}
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">MERMAID_PRIVACY_POLICY_URL</code>
          {t('privacy.selfHostedMiddle')}
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">MERMAID_HIDE_PRIVACY_POLICY</code>
          {t('privacy.selfHostedAfter')}
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">true</code>
          {t('privacy.selfHostedEnd')}
        </p>
      {/if}
    </Dialog.Content>
  </Dialog.Root>
{/if}
