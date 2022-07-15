import { writable } from 'svelte/store';

export type SizeValues = '4' | '6' | null;
export type ThemeValues = 'marvel' | 'dc' | 'starwars' | 'nintendo' | null;

interface SettingsProps {
    size: SizeValues;
    theme: ThemeValues;
}

export interface BoardCell {
    key: string;
    bg: string;
    open: boolean;
    show: boolean;
    matched: boolean;
}

function createSettings() {
    const { subscribe, update } = writable({ size: null, theme: null } as SettingsProps);

    return {
        subscribe,
        setSize: (size: SizeValues) => update((state) => ({ ...state, size })),
        setTheme: (theme: ThemeValues) => update((state) => ({ ...state, theme })),
    }
}

function createBoard() {
    const { subscribe, set, update } = writable([] as BoardCell[]);

    return {
        subscribe,
        add: (index: number, card: BoardCell) => update((state) => {
            state[index] = card;
            return state;
        }),
        updateByIndex: (index: number, payload: Record<string, string | boolean>) => update((state) => (
            state.map((item, i) => {
                if (index === i) {
                    return { ...item, ...payload };
                }

                return item;
            })
        )),
        updateByKeys: (keys: string[], payload: Record<string, string | boolean>) => update((state) => (
            state.map((item) => {
                if (keys.includes(item.key)) {
                    return { ...item, ...payload };
                }

                return item;
            })
        )),
        reset: () => set([]),
    }
}

export const view = writable('settings' as 'settings' | 'game' | 'result');
export const settings = createSettings();
export const board = createBoard();
export const moves = writable(0);
export const timer = writable(0);
