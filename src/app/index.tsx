import { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import KartaPako from "../components/KartaPako";
import { pakot } from "../data/pakot";

export default function Index() {
  const [zgjedhur, setZgjedhur] = useState<string | null>(null);
  const pakoZgjedhur = pakot.find((p) => p.id === zgjedhur);

  return (
    <View style={styles.faqja}>
      <Text style={styles.titulli}>Pakot e mia</Text>

      <FlatList
        data={pakot}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ gap: 12 }}
        style={{ flexGrow: 0 }}
        renderItem={({ item }) => (
          <KartaPako
            pako={item}
            zgjedhur={item.id === zgjedhur}
            onPress={() => setZgjedhur(item.id)}
          />
        )}
      />

      {pakoZgjedhur && (
        <View style={styles.pyetjet}>
          <Text style={styles.nentitulli}>{pakoZgjedhur.emri}</Text>
          {pakoZgjedhur.kartelat.map((k) => (
            <Text key={k.id}>• {k.pyetja}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  faqja: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
    gap: 16,
  },
  titulli: { fontSize: 26, fontWeight: "bold" },
  pyetjet: { width: 300, gap: 6 },
  nentitulli: { fontSize: 18, fontWeight: "bold" },
});