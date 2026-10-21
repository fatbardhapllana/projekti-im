import { Pressable, Text, StyleSheet } from "react-native";
import { Pako } from "../data/pakot";

type Props = {
  pako: Pako;
  zgjedhur: boolean;
  onPress: () => void;
};

export default function KartaPako({ pako, zgjedhur, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.karta,
        { backgroundColor: pako.ngjyra },
        zgjedhur && styles.zgjedhur,
      ]}
    >
      <Text style={styles.emri}>{pako.emri}</Text>
      <Text style={styles.numri}>{pako.kartelat.length} kartela</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  karta: {
    padding: 16,
    borderRadius: 12,
    width: 300,
    borderWidth: 3,
    borderColor: "transparent",
  },
  zgjedhur: { borderColor: "#111" },
  emri: { color: "white", fontSize: 20, fontWeight: "bold" },
  numri: { color: "white", marginTop: 4 },
});