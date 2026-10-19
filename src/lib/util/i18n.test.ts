import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { i18n, setLocale, t } from './i18n.svelte';

describe('i18n', () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        clear: () => values.clear(),
        getItem: (key: string) => values.get(key) ?? null,
        key: (index: number) => [...values.keys()][index] ?? null,
        get length() {
          return values.size;
        },
        removeItem: (key: string) => {
          values.delete(key);
        },
        setItem: (key: string, value: string) => values.set(key, value)
      } satisfies Storage
    });
  });

  afterEach(() => {
    setLocale('en');
    localStorage.clear();
  });

  it('translates messages and interpolates values', () => {
    setLocale('zh-CN');

    expect(t('menu.new')).toBe('新建');
    expect(t('menu.unsupported', { domain: 'example.com' })).toBe(
      '此图表类型不受 example.com 支持'
    );
  });

  it('persists the selected locale and updates the document language', () => {
    setLocale('zh-CN');

    expect(i18n.current).toBe('zh-CN');
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(localStorage.getItem('mermaid-live-editor-locale')).toBe('zh-CN');
  });
});
