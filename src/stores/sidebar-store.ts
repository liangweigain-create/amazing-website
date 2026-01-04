import { create } from 'zustand'

interface SidebarState {
    isOpen: boolean;
}

interface SidebarAction {
    toggle: () => void;
    open: () => void;
    close: () => void;
}

export const useSidebarStore = create<SidebarAction & SidebarState>()((set) => ({
    isOpen: true,

    toggle: () => set((state) => ({
        isOpen: !state.isOpen
    })),

    open: () => set({ isOpen: true }),

    close: () => set({ isOpen: false })
}))