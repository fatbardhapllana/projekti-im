import { StyleSheet, Text } from "react-native";

type Props = {
  emri: string;
};

export default function Pershendetje({ emri }: Props) {
  return <Text style={styles.teksti}>Përshëndetje, {emri}!</Text>;
}

const styles = StyleSheet.create({
  teksti: {
    fontSize: 24,
    fontWeight: "bold",
  },
});