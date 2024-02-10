"use client";
import { StateCreator } from "zustand";
import { Dialog, Toast } from "../types";

export interface AppSlice {
  toast: Toast | null;
  dialog: Dialog | null;
  setToast: (toast: Toast | null, duration?: number) => void;
  setDialog: (dialog: Dialog | null) => void;
}

export const createAppSlice: StateCreator<AppSlice, [], [], AppSlice> = (
  set
) => ({
  toast: null,
  dialog: null,
  setToast: (toast, duration = 3000) => {
    set({ toast });
    setTimeout(() => set({ toast: null }), duration);
  },
  setDialog: (dialog) => {
    set({ dialog });
    const el = document.getElementById("appDialog") as any;
    if (dialog) {
      el?.showModal();
    } else {
      el?.close();
    }
  },
});
