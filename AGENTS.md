Projekti

LearnUp është aplikacion për studentë universiteti ku ruajnë kartela, shënime dhe kuize për çdo lëndë.

Përdoruesi
Student universiteti që mëson para provimeve dhe e përdor kryesisht në telefon.
Problemi: ka shënime të shpërndara kudo dhe nuk di si t'i përsërisë para provimit.
Ekranet
Lëndët (ekrani kryesor): lista e lëndëve (Elektronikë, Statistikë...) dhe shtimi i një lënde të re.
Brenda lëndës: zgjedh midis kartelave, shënimeve dhe kuizeve të asaj lënde.
Kartelat: lista e kartelave të lëndës (pyetje / përgjigje) dhe shtimi i një kartele të re.
Shënimet: lista e shënimeve të lëndës (titull dhe tekst).
Kuizet: pyetje me disa përgjigje dhe rezultati në fund.
Stack
Expo (React Native), TypeScript, Expo Router
Supabase (supabase-js), projekti "LearnUp"
.env.local: EXPO_PUBLIC_SUPABASE_URL dhe EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
KURRË service_role key / sb_secret_ në aplikacion apo GitHub
Rregullat për agjentin
Hapa të vegjël; një ndryshim në një kohë
Shpjego çdo ndryshim para se ta bësh (çka dhe pse), në shqip
Pyet para se të instalosh paketa
Mos prek .env apo sekrete
Commit pas çdo hapi që punon
Teksti i UI-së në shqip
Rendi i ndërtimit: së pari kartelat, pastaj shënimet, në fund kuizet
Skedarët ekzistues (src/app/balancIT, components/KartaPako.tsx, KartaTerminit.tsx, Pershendetje.tsx) janë nga një ushtrim i mëparshëm: mos i fshi dhe mos i ndrysho pa pyetur
Tabela ekzistuese "lessons" në Supabase nuk përdoret; fillojmë me tabela të reja
Statusi
Punon tani: lidhja e projektit Expo me Supabase (Hapi 0)
Misioni tjetër: M1 (lexo nga Supabase tabelën e lëndëve)
Rregullat teknike të Expo

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

Read the major version of the expo package in package.json.
Fetch the matching versioned docs: https://docs.expo.dev/versions/v<major>.0.0/
For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.
Commands

Use bunx instead of npx if the project uses bun (bun.lock present).

bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions

Run lint and typecheck before declaring any task done.

Navigation & Routing
Use Expo Router for all navigation. Routes live in src/app/ — every file there is a screen, _layout.tsx files define navigators. Keep non-route code (components, hooks, utils) outside src/app/.
Import Link, router, and useLocalSearchParams from expo-router.
Docs: https://docs.expo.dev/router/introduction.md
Building with EAS

Use EAS to build, sign, and submit the app in the cloud (eas build, eas submit) and to ship over-the-air updates (eas update) — no local Xcode or Android Studio required. Run EAS CLI as bunx eas-cli <command> in Bun projects, or npx eas-cli@latest <command> otherwise; substitute that for bare eas in docs examples. Docs: https://docs.expo.dev/eas/index.md

Rules
If ios/ and android/ directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in app.json and config plugins.
Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: npx expo run:ios|android locally, or eas build --profile development.
Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md