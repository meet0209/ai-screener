import { create } from 'zustand';

export type Role = 'admin' | 'reviewer' | 'candidate';

interface AuthState {
  token: string | null;
  role: Role | null;
  user?: { name: string; email: string };
  setAuth: (payload: { token: string; role: Role; user: { name: string; email: string } }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  user: undefined,
  setAuth: (payload) =>
    set(() => ({
      token: payload.token,
      role: payload.role,
      user: payload.user,
    })),
  logout: () => set({ token: null, role: null, user: undefined }),
}));
