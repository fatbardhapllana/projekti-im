import { useState } from "react";
import { Button, Text, View } from "react-native";
import Pershendetje from "../components/Pershendetje";

export default function Index() {
  const [numri, setNumri] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Pershendetje emri="Fatbardha" />

      <Text>Me useState: {numri}</Text>
      <Button title="Rrit useState" onPress={() => setNumri(numri + 1)} />
    </View>
  );
}