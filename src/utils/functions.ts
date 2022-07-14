export function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function timerFormat(date: Date): string {
    const formatter = new Intl.DateTimeFormat('default', { 
        minute: 'numeric',
        second: 'numeric',
    });

    return formatter.format(date);
}
