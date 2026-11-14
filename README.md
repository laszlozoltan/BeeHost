# BeeHost – Vadméhek felmérése Kolozsváron / Cercetarea albinelor solitare din Cluj-Napoca

Trilingual (Hungarian / Romanian / English) one-page website of the **BeeHost** project: a citizen-science survey of solitary (wild) bees that nest in insect hotels on balconies and in gardens in Cluj-Napoca. The project runs at the Faculty of Biology and Geology, Babeș-Bolyai University.

The page replaces the earlier WordPress site (beehostcom.wordpress.com); its content comes from that site's export (28 Oct 2026).

## Contents of the page

| Section | HU | RO |
|---|---|---|
| Intro and key figures | Méhekről | Albinele |
| Social vs. solitary bees, why they matter, threats | Szociális vagy magányos? | Sociale sau solitare? |
| Insect hotel: nesting, when to put it out | Rovarhotel | Hotelul pentru insecte |
| Life cycle (spring, summer, winter) | Életciklus | Ciclul de viață |
| Guests: mason bees, leafcutters, wasps and parasitoids, other insects | Vendégek | Oaspeții |
| Volunteer survey and contact | Felmérés | Cercetarea |

## Files

```
index.html          home page
kutatas.html        research overview (linked from the "Részletek" button on the home page)
felmeres.html       current survey: how it works, link to the data sheet
adatlap.html        data sheet for volunteers (personal code + form + photos)
jelentkezes.html    volunteer sign-up
eredmenyek.html     public results page (2021 pilot and 2023 season)
css/style.css       all styles, shared by every page
js/lang.js          HU/RO/EN switch for the subpages
js/map.js           interactive results map (survey + species switch)
js/map-data.js      map data: 2023 hexagon cells, 2021 parks
vendor/leaflet/     Leaflet 1.9.4 map library (BSD-2-Clause licence)
apps-script/Code.gs Google Apps Script that writes data-sheet entries into a Google Sheet
README.md           this file
images/             drawings with transparent background (WebP)
  plugs/            nest-closure drawings 1–9
```

No build step and no dependencies. `apps-script/Code.gs` is not used by the website itself; it is pasted into Google Apps Script (see below). The only external resources are the Google Fonts **Josefin Sans** (all text).

## Publishing on GitHub Pages

1. Create a repository (e.g. `beehost`) and upload `index.html`, `README.md` and the `images` folder to the root. In the GitHub web interface, drag the whole `images` folder onto **Add file → Upload files**; the folder structure is kept.
2. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, and save.
3. After a minute the site is live at `https://<username>.github.io/<repository>/`.

## Editing

- **Language:** every text appears three times, as `<span class="hu">…</span>`, `<span class="ro">…</span>` and `<span class="en">…</span>`. Edit all three. The HU/RO/EN switch in the hero remembers the visitor's choice.
- **Species list:** the guest tabs are generated from the `G` array in the `<script>` at the end of the file. Each species is an object `{sci, name:{hu,ro,en}, txt:{hu,ro,en}, img}`; `img` is optional.
- **Adding a drawing:** put the drawing in `images/` as a transparent WebP or PNG (lower-case, hyphenated name, about 600 px wide), add a line such as `const XY_IMG='images/genus-species.webp';` above `const G=[`, and add `"img":XY_IMG` to that species. The caption under every drawing reads “fent nőstény, lent hím” / “sus femela, jos masculul”, so drawings should show the female on top.
- **Colours:** set once in the `:root` block at the top of the `<style>`:

  | Colour | Hex | Used for |
  |---|---|---|
  | Evening Blue | `#2A2940` | text, headings, hero, footer |
  | Chocolate Truffle | `#69424A` | accents, contact band, mud plugs |
  | Shale Green | `#6F9170` | leaf plugs, figures, labels |
  | Palm | `#AFAF5F` | sign-up button, compare field |
  | Dutch Canal | `#9BBDE3` | light fills, pollen in the hero |
  | Angora | `#E4D6BF` | alternate section background |
  | Ether | `#9EB5B6` | page background around the box |
  | White Onyx | `#D8D8D0` | inactive months, larvae |

  Hex values were estimated from a colour-swatch image; replace them if you have the exact codes.
- **Graphics:** the reed-tube hero and the plug key are drawn with `<canvas>` in the script; the species and life-cycle drawings are image files in `images/`.

## Notes

- The original WordPress pages used photos from Flickr and other sources with individual credits. They are not in this version. If you add photos back, keep the photographer credits.
- *Osmia adunca* is listed under its current name, *Hoplitis adunca*.
- The assignment of the *O. leaiana* and *O. brevicornis* drawings was made from their appearance; check before publishing.
- Corrections made to the original text:
  - *Trypoxylon* is placed in Crabronidae; the RO page had it under "Apocrita".
  - Leucospidae hosts are given as Megachilidae; the RO page said "albinele artistice".
  - In the RO life cycle, eggs are laid on "pâinea de albine"; the old text said "ceara de albine".
- The garbled "one in four of five" pollination figure was left out.

## Contact

László Zoltán – zoltan.laszlo@ubbcluj.ro
Babeș-Bolyai University, Faculty of Biology and Geology, Cluj-Napoca

## Sign-up, data sheet and Google Sheets / Drive

GitHub Pages cannot store data, so both forms send to a Google Apps Script web app (`apps-script/Code.gs`), bound to a private Google Sheet:

- **Sign-up (`jelentkezes.html`).** Name, e-mail, optional phone, district, placement, hotel status and ID, notes, and consent. Each sign-up becomes a row on the `Önkéntesek` tab. You get a notification e-mail and the volunteer gets a confirmation. Duplicate e-mails are not added twice.
- **Approval.** Tick the `jóváhagyva` checkbox for the volunteer, then in the sheet menu choose **BeeHost → Kódok kiküldése a jóváhagyottaknak**. Each newly approved volunteer gets a personal code (`BH-XXXX-XXXX`) by e-mail, in the language they signed up in. To block someone, untick `jóváhagyva`; their code stops working at once.
- **Data sheet (`adatlap.html`, not indexed).** The volunteer signs in with the code, which the script checks on Google's side. Name and e-mail are filled in from the sign-up. Every submission is checked against the code again and written to the `Adatok` tab with the volunteer's code.
- **Photos.** Up to 6 per check. They are resized in the browser (longest side 1600 px, JPEG) and saved to the Drive folder **BeeHost fotók**, one subfolder per hotel ID, named `HOTEL_DATE_n.jpg`. The sheet row gets the photo count and the Drive links. The files stay private to the sheet owner.

Setup (once):
1. In the Google Sheet: **Extensions → Apps Script**, paste `apps-script/Code.gs`, save.
2. Choose `setup` in the function list and press **Run**. Authorise access to the sheet, Google Drive and sending e-mail. This creates the `Adatok` and `Önkéntesek` tabs and the `BeeHost fotók` folder.
3. **Deploy → New deployment → Web app**, with *Execute as*: Me and *Who has access*: Anyone. To update an existing deployment, use **Deploy → Manage deployments → edit → Version: New version**; the URL stays the same.
4. Put the URL into `SCRIPT_URL` in `gen/adatlap.py`, which `jelentkezes.py` reads too, and regenerate. Or edit `SCRIPT_URL` directly in both `adatlap.html` and `jelentkezes.html`.

The data sheet is a five-step app: who and where, check, sealed tubes (tap + / − on each plug type), observations and photos, review. It fills in today's date and time. On that device it can remember the code and the volunteer's hotel, and it keeps an unsent draft if the connection drops. Photos are not part of the draft.

Personal data (names, e-mails, phones, addresses) stays in the private sheet and is never published on the site.

## Results page (eredmenyek.html)

Built from Kovács Kinga's BSc thesis (2021 data) and MSc dissertation (2023 data), and the BeeHost meeting materials (20 Nov 2023, 6 Mar 2025, 11 Dec 2025). The species list is the preliminary list from the MSc dissertation (Table 3); species names were normalised to current spelling. To update, edit the figures and the list directly in `eredmenyek.html`, in all three languages.

## Results map

`eredmenyek.html` has an interactive map (Leaflet; Esri World Imagery satellite background by default, OpenStreetMap as an alternative) with a 2021 / 2023 switch and a layer menu.

- **2023:** hotel locations and species presence (*Osmia cornuta*, *O. bicornis* = *O. rufa*, *Trypoxylon* sp., *Leucospis dorsigera*, other) were digitised from the maps shown at the closing meeting on 20 Nov 2023 and georeferenced with the scale bar and two landmarks (Cluj Arena, the airport runway). Positions are approximate. To protect volunteers' privacy every point is generalised to a hexagon of about 600 m; no single hotel is shown.
- **Border:** the Cluj-Napoca municipality outline from geoBoundaries (ROU ADM2, gbOpen, simplified), drawn as a dashed line on both maps.
- **2021:** the seven parks of the pilot, at approximate park centres, with the share of occupied reed stems / wood holes read off Fig. 8 of the BSc thesis.

When exact coordinates are available, regenerate `js/map-data.js` (`cells2023`: list of hexagons with `hotel`, `obs` and one 0/1 field per species; `parks2021`: list of parks with `lat`, `lon`, `reed`, `wood`).
