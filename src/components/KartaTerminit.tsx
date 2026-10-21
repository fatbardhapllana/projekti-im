import { useState } from "react";
import { View } from "react-native";
import KartaTerminit from "../components/KartaTerminit";

export default function Index() {
  const [konfirmuar, setKonfirmuar] = useState<string[]>([]);

  const statusi = (id: string) =>
    konfirmuar.includes(id) ? "Konfirmuar" : "Në pritje";

  // nëse është konfirmuar e heq nga lista, përndryshe e shton
  const konfirmo = (id: string) =>
    setKonfirmuar((lista) =>
      lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]
    );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <KartaTerminit
        ora="09:00"
        klienti="Arben K."
        sherbimi="Qethje"
        statusi={statusi("t1")}
        onKonfirmo={() => konfirmo("t1")}
      />
      <KartaTerminit
        ora="10:30"
        klienti="Drita M."
        sherbimi="Larje"
        shenim="Ardh 10 minuta më herët"
        statusi={statusi("t2")}
        onKonfirmo={() => konfirmo("t2")}
      />
      <KartaTerminit
        ora="12:00"
        klienti="Besnik H."
        sherbimi="Qethje + mjekër"
        statusi={statusi("t3")}
        onKonfirmo={() => konfirmo("t3")}
      />
    </View>
  );
}