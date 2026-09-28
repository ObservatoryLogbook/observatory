## Navigation og design

- [x] Tilføj observationens titel til topmenuen på den enkelte Logbook-entry.
- [ ] Gør skrifttypen for Status, Started og Observations på Science-kort konsistent med Engineering-kort.
- [ ] Afklar og tilføj søgning i Observatory.
- [ ] Tilføj Observatory-logo/favicon til browserfaner og øvrig site metadata.

## Training

- [ ] Registrér alle træningsdage, også dage med auxiliary-øvelser uden topsæt.
- [ ] Vis træningsdage i en kalender med én række pr. måned og én kasse pr. dato.
- [ ] Overfør historiske træningsdatoer fra Apple Notes, og skeln mellem fridage og manglende registreringer.

## Reading og indhold

- [ ] Afklar og tilføj plads til egen tekst på den enkelte bogside.
- [ ] Udbyg Observatory med flere Engineering-systemer og Science-projekter.

## Domæne og besøgsstatistik

- [ ] Undersøg og opsæt et eget domæne til Observatory.
- [ ] Afklar, hvad besøgsstatistik skal fortælle, og vælg en passende løsning.

## iPhone-workflow

- [x] Registrér topsæt og kropsmålinger direkte i Observatory fra telefonen.
- [ ] Etablér et workflow til at skrive og udgive Logbook-observationer fra iPhone uden at skulle forbi computeren.
- [ ] Gør det muligt at gemme en kladde og færdiggøre den senere.

## P-i-c trail E Egg

- [ ] Afklar første etape.
- [ ] Byg og afprøv den.

## Sick Bay

- [x] Opret en Sick Bay-landingsside, og flyt det nuværende dashboard til Body Composition.
- [ ] Afklar indhold og formål for Cardiovascular.
- [ ] Afklar indhold og formål for Sleep.
- [ ] Tilføj et forsidelink til Sick Bay, når strukturen er på plads.
- [x] Kontrollér, at Related observations finder de relevante Sick Bay-observationer.
- [ ] Tilføj read-only adgang til Sick Bay for Nicklas og Nikolaj.

## Fejl og tekniske kontroller

- [x] Test, at nye træningsdata vises på den udgivne Training-side uden nyt build.
- [x] Kontrollér og ret InBody-sparklines, så x-positioner følger måledatoer frem for rækkefølge.
- [x] Kontrollér InBody-grafernes håndtering af manglende/ugyldige værdier og tomme datasæt.
- [x] Kontrollér FFMI ved manglende data, og tydeliggør, når gennemsnittet bygger på få målinger.
- [x] Gennemgå Supabase-rettigheder for Training.
- [x] Kontrollér gamle signaturer og EXECUTE-rettigheder for save_inbody_scan.
- [x] Kontrollér InBody-figurernes mobilvisning for vandret overflow ved forskellige skærmbredder.
- [x] Forbedr topnavigationen på mobil.
- [x] Etablér statisk Astro/TypeScript-kontrol og ryd alle diagnostics.
- [x] Kontrollér, at produktionsbuildet gennemføres uden fejl eller advarsler.
- [x] Gennemgå og robustgør Sick Bay-authentication, private UI-state og fejltilstande.

## Mulig senere oprydning

- [ ] Saml fælles kode i InBody Lean/Fat-rendererne.
- [x] Erstat misvisende vægtspecifikke feltnavne i beregninger, der også bruges til FFMI.
- [ ] Opdel den store Sick Bay-side i mindre moduler.

## Idéer til senere

- Overvej en selvstændig FFMI-historikgraf.
- Undersøg relevante data fra Apple Health og øvrige søvnkilder.
- Overvej en Metabolism-side til energiindtag og -forbrug.
- Overvej en Medical Journal side under Sick Bay, der fortolker alle inputs til Sick Bay


