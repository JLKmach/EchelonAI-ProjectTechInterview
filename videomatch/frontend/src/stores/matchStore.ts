import { create } from 'zustand';
import { Match, User } from '../types';

interface MatchState {
  matches: Match[];
  currentMatch: Match | null;
  potentialMatches: User[];
  isLoading: boolean;
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  updateMatch: (matchId: string, updates: Partial<Match>) => void;
  setCurrentMatch: (match: Match | null) => void;
  setPotentialMatches: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  clearMatches: () => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  currentMatch: null,
  potentialMatches: [],
  isLoading: false,
  
  setMatches: (matches: Match[]) => {
    set({ matches });
  },
  
  addMatch: (match: Match) => {
    const currentMatches = get().matches;
    set({ matches: [...currentMatches, match] });
  },
  
  updateMatch: (matchId: string, updates: Partial<Match>) => {
    const currentMatches = get().matches;
    const updatedMatches = currentMatches.map(match =>
      match.id === matchId ? { ...match, ...updates } : match
    );
    set({ matches: updatedMatches });
    
    // Also update currentMatch if it's the one being updated
    const currentMatch = get().currentMatch;
    if (currentMatch && currentMatch.id === matchId) {
      set({ currentMatch: { ...currentMatch, ...updates } });
    }
  },
  
  setCurrentMatch: (match: Match | null) => {
    set({ currentMatch: match });
  },
  
  setPotentialMatches: (users: User[]) => {
    set({ potentialMatches: users });
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  clearMatches: () => {
    set({ matches: [], currentMatch: null, potentialMatches: [] });
  },
}));
