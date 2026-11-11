import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { dil } from '../lib/hyrja';
import { useSesioni } from '../lib/sesioni';
import { supabase } from '../lib/supabase';

type Lende = { id: number; emri: string };

export default function Lendet() {
  const { sesioni } = useSesioni();
  const [lendet, setLendet] = useState<Lende[]>([]);
  const [emri, setEmri] = useState('');
  const [dukeNgarkuar, setDukeNgarkuar] = useState(true);
  const [gabimi, setGabimi] = useState<string | null>(null);

  const ngarko = useCallback(async () => {
    const { data, error } = await supabase
      .from('lendet')
      .select('id, emri')
      .order('id', { ascending: false });
    if (error) {
      setGabimi(error.message);
    } else {
      setGabimi(null);
      setLendet(data ?? []);
    }
    setDukeNgarkuar(false);
  }, []);

  useEffect(() => {
    ngarko();
  }, [ngarko]);

  async function shto() {
    if (!emri.trim()) return;
    const { error } = await supabase.from('lendet').insert({ emri: emri.trim() });
    if (error) {
      Alert.alert('Gabim', error.message);
      return;
    }
    setEmri('');
    ngarko();
  }

  async function dalje() {
    try {
      await dil();
    } catch (e) {
      Alert.alert('Gabim', e instanceof Error ? e.message : 'Nuk u dil dot.');
    }
  }

  return (
    <View style={stilet.faqja}>
      <View style={stilet.koka}>
        <View style={{ flex: 1 }}>
          <Text style={stilet.titulli}>Lëndët e mia</Text>
          <Text style={stilet.email}>{sesioni?.user.email}</Text>
        </View>
        <Pressable style={stilet.dil} onPress={dalje}>
          <Text style={stilet.dilTekst}>Dil</Text>
        </Pressable>
      </View>

      <View style={stilet.rreshti}>
        <TextInput
          style={stilet.fusha}
          placeholder="Lënda e re (p.sh. Elektronikë)"
          value={emri}
          onChangeText={setEmri}
        />
        <Pressable style={stilet.shto} onPress={shto}>
          <Text style={stilet.shtoTekst}>Shto</Text>
        </Pressable>
      </View>

      {dukeNgarkuar ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : gabimi ? (
        <Text style={stilet.gabim}>Gabim: {gabimi}</Text>
      ) : (
        <FlatList
          data={lendet}
          keyExtractor={(l) => String(l.id)}
          ListEmptyComponent={<Text style={stilet.bosh}>Nuk ke asnjë lëndë ende. Shto të parën.</Text>}
          renderItem={({ item }) => (
            <View style={stilet.karta}>
              <Text style={stilet.kartaTekst}>{item.emri}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const stilet = StyleSheet.create({
  faqja: { flex: 1, paddingTop: 64, paddingHorizontal: 20, backgroundColor: '#f6f7f9' },
  koka: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  titulli: { fontSize: 26, fontWeight: '800', color: '#1f3a6e' },
  email: { fontSize: 13, color: '#666' },
  dil: { borderWidth: 1, borderColor: '#1f3a6e', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 14 },
  dilTekst: { color: '#1f3a6e', fontWeight: '700' },
  rreshti: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  fusha: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  shto: { backgroundColor: '#1f3a6e', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center' },
  shtoTekst: { color: '#fff', fontWeight: '700' },
  karta: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: '#e4e7ec' },
  kartaTekst: { fontSize: 18 },
  bosh: { color: '#666', marginTop: 24, textAlign: 'center' },
  gabim: { color: '#b42318', marginTop: 24 },
});
