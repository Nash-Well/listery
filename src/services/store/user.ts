import { create } from 'zustand';

import { User } from '@/types';

type EmptyOrUser = User | null;

interface LocalUser {
   user:    EmptyOrUser;
   setUser: (user: EmptyOrUser) => void;
};

const useLocalUser = create<LocalUser>((set) => ({
   user:    null,
   setUser: (user: EmptyOrUser) => {
      set({ user: user });
   }
}));

export { useLocalUser };
