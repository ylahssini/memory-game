import { writable } from 'svelte/store';

export type SizeValues = '4x4' | '6x6' | null;
export type ThemeValues = 'marvel' | 'dc' | 'starwars' | 'nintendo' | null;

interface SettingsProps {
    size: SizeValues;
    theme: ThemeValues;
}

function createSettings() {
    const { subscribe, update } = writable({ size: null, theme: null } as SettingsProps);

    return {
        subscribe,
        setSize: (size: SizeValues) => update((state) => ({ ...state, size })),
        setTheme: (theme: ThemeValues) => update((state) => ({ ...state, theme })),
    }
}

export const view = writable('settings' as 'settings' | 'game' | 'result');
export const settings = createSettings();
