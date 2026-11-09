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
index.html          the whole page: HTML, CSS and JavaScript
README.md           this file
images/             drawings with transparent background (WebP): species 600 px, life cycle 1000 px wide
  osmia-cornuta.webp
  osmia-bicornis.webp
  osmia-caerulescens.webp
  osmia-leaiana.webp
  osmia-brevicornis.webp
  hoplitis-adunca.webp
  apis-mellifera.webp, osmia-cornuta-female.webp   social vs. solitary comparison
  cycle-1-egg.webp     life cycle: pollen loaves and eggs
  cycle-2-larva.webp   life cycle: larvae
  cycle-3-cocoon.webp  life cycle: cocoons
  plugs/              nest-closure drawings 1–9 for the “How to read the sealed tubes” key
```

No build step and no dependencies. The only external resources are the Google Fonts **Josefin Sans** (all text).

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
