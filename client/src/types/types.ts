export type ToastType = 'success' | 'warning' | 'error' | null;

export type User = {
    id: number,
    name: string,
    email: string,
    address: string | null,
    avatar: string | null,
    phone: string | null,
}