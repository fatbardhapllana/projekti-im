export type Kartela = {
  id: string;
  pyetja: string;
  pergjigja: string;
};

export type Pako = {
  id: string;
  emri: string;
  ngjyra: string;
  kartelat: Kartela[];
};

export const pakot: Pako[] = [
  {
    id: "mikroprocesoret",
    emri: "Mikroprocesorët",
    ngjyra: "#2563eb",
    kartelat: [
      {
        id: "m1",
        pyetja: "Çfarë është regjistri?",
        pergjigja: "Njësi e vogël memorie shumë e shpejtë brenda CPU-së.",
      },
      {
        id: "m2",
        pyetja: "Çfarë bën ALU?",
        pergjigja: "Kryen veprimet aritmetike dhe logjike.",
      },
    ],
  },
  {
    id: "statistike",
    emri: "Statistikë",
    ngjyra: "#16a34a",
    kartelat: [
      {
        id: "s1",
        pyetja: "Çfarë është mesatarja?",
        pergjigja: "Shuma e vlerave pjesëtuar me numrin e tyre.",
      },
      {
        id: "s2",
        pyetja: "Çfarë është mediana?",
        pergjigja: "Vlera në mes kur të dhënat renditen.",
      },
    ],
  },
  {
    id: "web",
    emri: "Zhvillim Web",
    ngjyra: "#ea580c",
    kartelat: [
      {
        id: "w1",
        pyetja: "Çfarë është HTML?",
        pergjigja: "Gjuha e shënjimit që jep strukturën e faqes.",
      },
    ],
  },
];