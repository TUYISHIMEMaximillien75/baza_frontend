import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── UI Store ─────────────────────────────────────────────────────────────────
interface UIState {
  isSidebarOpen: boolean;
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isMobileNavOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
}));

// ─── Modal Store ──────────────────────────────────────────────────────────────
interface ModalState {
  activeModal: string | null;
  modalPayload: any;
  openModal: (modalId: string, payload?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalPayload: null,
  openModal: (modalId, payload = null) => set({ activeModal: modalId, modalPayload: payload }),
  closeModal: () => set({ activeModal: null, modalPayload: null }),
}));

// ─── Session Store ────────────────────────────────────────────────────────────
export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  status: string;
  emailVerified: boolean;
  roles: string[];
}

interface SessionState {
  user: SessionUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (user: SessionUser, accessToken: string, refreshToken: string) => void;
  updateToken: (accessToken: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      setSession: (user, accessToken, refreshToken) =>
        set({ user, isAuthenticated: true, accessToken, refreshToken }),
      updateToken: (accessToken) => set({ accessToken }),
      clearSession: () =>
        set({ user: null, isAuthenticated: false, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'baza-session', // persisted to localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
