'use client';
import { create } from 'zustand';

import { MemberData } from '@/lib/shared_types';
import axios from '@/lib/axios';

interface state {
  member: MemberData | null;
  follow_activity: {
    activity_id: string;
  }[];
}

interface actions {
  setMember: (member: MemberData) => void;
  fetchMember: () => void;
  fetchFollowActivity: () => void;
  logout: () => void;
}

export const useMember = create<state & actions>((set) => ({
  member: null,
  follow_activity: [],
  setMember: (member: MemberData) => set({ member }),
  fetchMember: async () => {
    // get status from server
    const { data } = await axios.get(`/user/islogin`);
    if (data) {
      set({ member: data });
      const { data: follow_activity } = await axios.get(`/activity/follow`);
      set({ follow_activity });
    }
  },
  fetchFollowActivity: async () => {
    const { data } = await axios.get(`/activity/follow`);
    set({ follow_activity: data });
  },
  logout: async () => {
    await axios.post(`/user/logout`);
    set({ member: null });
    set({ follow_activity: [] });
  },
}));
