import { create } from 'zustand';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, user: User | null) => void;
  logout: () => void;
}

const isBrowser = typeof window !== 'undefined';
const initialAccessToken = isBrowser ? localStorage.getItem('accessToken') : null;
const initialUser = isBrowser
  ? (() => {
      try {
        const u = localStorage.getItem('user');
        return u ? JSON.parse(u) : null;
      } catch {
        return null;
      }
    })()
  : null;

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: initialAccessToken,
  user: initialUser,
  setAuth: (accessToken, user) => {
    if (isBrowser) {
      if (accessToken) localStorage.setItem('accessToken', accessToken);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      else localStorage.removeItem('user');
    }
    set({ accessToken, user });
  },
  logout: () => {
    if (isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    set({ accessToken: null, user: null });
  },
}));
