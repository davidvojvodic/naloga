# Laravel backend - Vite frontend naloga

Ta projekt je spletna aplikacija z Laravel backendom in Vite frontendom. Značilnosti vključujejo uporabniško avtentikacijo, nadzorno ploščo za upravljanje uporabnikov in aplikacija podpira svetlo ter temno temo. Uporabniški vmesnik je zgrajen z uporabo knjižnice Shadcn in Tailwind CSS, kar zagotavlja sodoben dizajn. Za validacijo obrazcev je uporabljena knjižnica Zod, ki zagotavlja robustno in učinkovito preverjanje vnosov.

## Značilnosti

- Uporabniška Avtentikacija: stran je zavarovana in ima prijavo ter registracijo, kjer podatke shrani v User tabelo.
- Nadzorna plošča za upravljanje uporabnikov: Pregled in upravljanje uporabnikov. Funkcionalnosti vključujejo izbiro naključnega uporabnika in shranjevanje te izbire v tabelo SelectedUser.
- Stran Uporabnikov: Prikaz uporabnikov iz tabele User. Dodajanje, urejanje ali brisanje uporabnikov.
- Obdelava obrazcev: strani za ustvarjanje in urejanje podrobnosti uporabnika s pomočjo Zod validacije.
- Integracija API-ja: Klici API-ja v ozadju z uporabo Axios.
- Dizajn: Izdelan s Tailwind CSS ter Shadcn.
- Preklop Tem: Preklapljanje med svetlo in temno temo.
- Interaktiven UI: Dodanih nekaj animacij.
