import { create } from 'zustand'

export const canvasStore = create(set => ({
    data: {},
    updateData: (newData:object) => set({ data: newData }),
}))
