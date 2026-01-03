import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  count: number
}

type Actions = {
  increment: () => void
}

export const useStore = create<State & Actions>()(
  immer((set) => ({
    count: 0,
    increment: () => set((state) => { state.count += 1 }), // Immer 允许直接修改
  }))
)