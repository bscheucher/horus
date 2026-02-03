import { create } from "zustand";
import { clearUserCookie, getUserCookie, setUserCookie } from "../lib/cookies";
import type { User } from "../types/user";

interface UserState {
	user: User | null;
	isLoading: boolean;
	setUser: (user: User) => void;
	clearUser: () => void;
	restoreFromCookie: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	isLoading: false,

	setUser: (user: User) => {
		setUserCookie(user);
		set({ user });
	},

	clearUser: () => {
		clearUserCookie();
		set({ user: null });
	},

	restoreFromCookie: () => {
		const user = getUserCookie();
		if (user) {
			set({ user });
		}
	},
}));
