import { writable, readable } from 'svelte/store';

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

export const timer = readable(0, function (set) {
    const beginningDate = new Date();
    const beginningTime = beginningTime.getTime();
    
    const interval = setInterval(() => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        set(timerFormat(currentTime - beginningTime));
    }, 1000);

    return function stop() {
        set(0);
        clearInterval(interval);
    };
});
