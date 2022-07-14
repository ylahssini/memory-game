import { writable, readable } from 'svelte/store';
import { timerFormat } from './functions';

export type SizeValues = '4' | '6' | null;
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
export const moves = writable(0);
export const timer = readable('00:00', function (set) {
    const date = new Date(2022, 1, 1, 0, 0, 0);
    const interval = setInterval(() => {
        date.setSeconds(date.getSeconds() + 1);
        set(timerFormat(date));
    }, 1000);

    return function stop() {
        clearInterval(interval);
    }
});
