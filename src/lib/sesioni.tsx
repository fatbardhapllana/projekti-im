import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from './supabase';

type SesioniKonteksti = { sesioni: Session | null; dukeNgarkuar: boolean };

const Kontekst = createContext<SesioniKonteksti>({ sesioni: null, dukeNgarkuar: true });

export function SesioniProvider({ children }: { children: ReactNode }) {
  const [sesioni, setSesioni] = useState<Session | null>(null);
  const [dukeNgarkuar, setDukeNgarkuar] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSesioni(data.session);
      setDukeNgarkuar(false);
    });
    const { data: pajtimi } = supabase.auth.onAuthStateChange((_ngjarja, sesioniRi) => {
      setSesioni(sesioniRi);
    });
    return () => pajtimi.subscription.unsubscribe();
  }, []);

  return <Kontekst.Provider value={{ sesioni, dukeNgarkuar }}>{children}</Kontekst.Provider>;
}

export function useSesioni() {
  return useContext(Kontekst);
}
