'use client';
import { create } from 'zustand';

import { MemberData } from '@/lib/shared_types';
import axios, { url } from '@/lib/axios';

interface state {
  member: MemberData | null;
}

interface actions {
  setMember: (member: MemberData) => void;
  fetchMember: () => void;
}

export const useMember = create<state & actions>((set) => ({
  member: null,
  setMember: (member: MemberData) => set({ member }),
  fetchMember: async () => {
    const { data } = await axios.get(`${url}/user/islogin`);
    set({ member: data });
  },
}));
