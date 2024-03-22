import { create } from 'zustand';

interface ISearch {
   search:    string;
   setSearch: (text: string) => void;
};

const useHeaderSearch = create<ISearch>((set) => ({
   search:    '',
   setSearch: (text: string) => {
      set({ search: text });
   }
}));

export { useHeaderSearch };