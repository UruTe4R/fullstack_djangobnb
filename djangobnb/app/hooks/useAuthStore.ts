import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => {
  return {
    isLoggedIn: false,
    setLoggedIn: (val: boolean) => set({ isLoggedIn: val }),
  }
})

export default useAuthStore;