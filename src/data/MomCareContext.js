import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MOOD_KEY = 'momcare:mood_entries';
const JOURNAL_KEY = 'momcare:journal_entries';

const MomCareContext = createContext(null);

function today() {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function MomCareProvider({ children }) {
  const [moodEntries, setMoodEntries] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [moodRaw, journalRaw] = await Promise.all([
          AsyncStorage.getItem(MOOD_KEY),
          AsyncStorage.getItem(JOURNAL_KEY),
        ]);
        setMoodEntries(moodRaw ? JSON.parse(moodRaw) : []);
        setJournalEntries(journalRaw ? JSON.parse(journalRaw) : []);
      } catch (e) {
        console.warn('Failed to load MomCare data', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const addMood = useCallback(async (mood, note = '') => {
    setMoodEntries((prev) => {
      const entry = { id: Date.now(), timestamp: Date.now(), date: today(), mood, note };
      const next = [entry, ...prev];
      AsyncStorage.setItem(MOOD_KEY, JSON.stringify(next)).catch((e) =>
        console.warn('Failed to save mood entry', e)
      );
      return next;
    });
  }, []);

  const addJournalEntry = useCallback(async (text) => {
    if (!text || !text.trim()) return;
    setJournalEntries((prev) => {
      const entry = { id: Date.now(), timestamp: Date.now(), date: today(), text };
      const next = [entry, ...prev];
      AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(next)).catch((e) =>
        console.warn('Failed to save journal entry', e)
      );
      return next;
    });
  }, []);

  const value = {
    loaded,
    moodEntries,
    journalEntries,
    addMood,
    addJournalEntry,
  };

  return <MomCareContext.Provider value={value}>{children}</MomCareContext.Provider>;
}

export function useMomCare() {
  const ctx = useContext(MomCareContext);
  if (!ctx) throw new Error('useMomCare must be used within a MomCareProvider');
  return ctx;
}
