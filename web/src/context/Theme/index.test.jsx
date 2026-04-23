import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ThemeProvider, useActualTheme, useTheme } from './index.jsx';

function Probe() {
  const theme = useTheme();
  const actualTheme = useActualTheme();
  return <div>{`${theme}|${actualTheme}`}</div>;
}

function renderThemeWithStorage(storedTheme) {
  globalThis.window = {
    matchMedia: () => ({
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    }),
  };

  globalThis.localStorage = {
    getItem(key) {
      if (key === 'theme-mode') {
        return storedTheme;
      }
      return null;
    },
    setItem() {},
  };

  return renderToString(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

describe('ThemeProvider', () => {
  const originalWindow = globalThis.window;
  const originalLocalStorage = globalThis.localStorage;

  beforeEach(() => {
    globalThis.window = undefined;
    globalThis.localStorage = undefined;
  });

  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.localStorage = originalLocalStorage;
  });

  test('defaults to dark mode when no stored theme exists', () => {
    expect(renderThemeWithStorage(null)).toContain('dark|dark');
  });

  test('keeps the stored theme preference', () => {
    expect(renderThemeWithStorage('light')).toContain('light|light');
  });
});
