'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedPropertiesContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

export function SavedPropertiesProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('trovestay_saved_properties');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved properties from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedIds changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('trovestay_saved_properties', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save properties to localStorage', e);
    }
  }, [savedIds, isLoaded]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) 
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <SavedPropertiesContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (context === undefined) {
    throw new Error('useSavedProperties must be used within a SavedPropertiesProvider');
  }
  return context;
}
