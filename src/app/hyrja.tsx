import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { hyr, krijoLlogari } from '../lib/hyrja';

export default function Hyrja() {
  const [email, setEmail] = useState('');
  const [fjalekalimi, setFjalekalimi] = useState('');
  const [dukePunuar, setDukePunuar] = useState(false);

  async function ekzekuto(veprimi: (e: string, f: string) => Promise<void>) {
    if (!email.trim() || fjalekalimi.length < 6) {
      Alert.alert('Kujdes', 'Shkruaj email-in dhe një fjalëkalim me të paktën 6 karaktere.');
      return;
    }
    setDukePunuar(true);
    try {
      await veprimi(email.trim(), fjalekalimi);
    } catch (gabimi) {
      Alert.alert('Gabim', gabimi instanceof Error ? gabimi.message : 'Diçka shkoi keq.');
    } finally {
      setDukePunuar(false);
    }
  }

  return (
    <View style={stilet.faqja}>
      <Text style={stilet.titulli}>LearnUp</Text>
      <Text style={stilet.nentitulli}>Hyr ose krijo llogari</Text>

      <TextInput
        style={stilet.fusha}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={stilet.fusha}
        placeholder="Fjalëkalimi (min. 6 karaktere)"
        secureTextEntry
        autoCapitalize="none"
        value={fjalekalimi}
        onChangeText={setFjalekalimi}
      />

      {dukePunuar ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : (
        <>
          <Pressable style={stilet.butoni} onPress={() => ekzekuto(hyr)}>
            <Text style={stilet.butoniTekst}>Hyr</Text>
          </Pressable>
          <Pressable style={[stilet.butoni, stilet.butoniDyte]} onPress={() => ekzekuto(krijoLlogari)}>
            <Text style={[stilet.butoniTekst, { color: '#1f3a6e' }]}>Krijo llogari</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const stilet = StyleSheet.create({
  faqja: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f6f7f9' },
  titulli: { fontSize: 32, fontWeight: '800', color: '#1f3a6e' },
  nentitulli: { fontSize: 16, color: '#555', marginBottom: 24 },
  fusha: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  butoni: { backgroundColor: '#1f3a6e', borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 8 },
  butoniDyte: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1f3a6e' },
  butoniTekst: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
