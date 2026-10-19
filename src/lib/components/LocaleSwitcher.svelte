<script lang="ts">
  import { i18n, setLocale, t, type Locale } from '$/util/i18n.svelte';
  import LanguageIcon from '~icons/material-symbols/language';
</script>

<label class="flex items-center justify-between gap-3 border-b-2 border-border-dark px-3 py-2">
  <span class="flex items-center gap-2">
    <LanguageIcon class="size-5" />
    {t('language.label')}
  </span>
  <select
    aria-label={t('language.label')}
    class="rounded border border-border bg-background px-2 py-1 text-sm"
    value={i18n.current}
    onchange={(event) => setLocale(event.currentTarget.value as Locale)}>
    <option value="en">{t('language.english')}</option>
    <option value="zh-CN">{t('language.chinese')}</option>
  </select>
</label>
