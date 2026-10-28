# BeeHost – Vadméhek felmérése Kolozsváron / Cercetarea albinelor solitare din Cluj-Napoca

Bilingual (Hungarian / Romanian) one-page website of the **BeeHost** project: a citizen-science survey of solitary (wild) bees that nest in insect hotels on balconies and in gardens in Cluj-Napoca. The project runs at the Faculty of Biology and Geology, Babeș-Bolyai University.

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

| File | Purpose |
|---|---|
| `index.html` | The whole site: HTML, CSS and JavaScript in one file (rename `beehost.html` to `index.html`) |
| `README.md` | This file |

No build step and no dependencies. The only external resources are the Google Fonts **Merriweather** (body text) and **Open Sans** (headings, menus, labels), the same pairing as the personal site at <https://laszlozoltan.github.io/personal/>.

## Publishing on GitHub Pages

1. Create a repository (e.g. `beehost`) and upload `index.html` and `README.md` to the root.
2. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, and save.
3. After a minute the site is live at `https://<username>.github.io/<repository>/`.

## Editing

- **Language:** every text appears twice, as `<span class="hu">…</span>` and `<span class="ro">…</span>`. Edit both. The HU/RO switch in the hero remembers the visitor's choice.
- **Species list:** the guest tabs are generated from the `G` array in the `<script>` at the end of the file. Each species is `[scientific name, HU name or family, RO family, HU note, RO note]`.
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
- **Graphics:** the reed-tube hero, the life-cycle stems and the plug key are drawn with `<canvas>` in the script; there are no image files.

## Notes

- The original WordPress pages used photos from Flickr and other sources with individual credits. They are not in this version. If you add photos back, keep the photographer credits.
- Corrections made to the original text:
  - *Trypoxylon* is placed in Crabronidae; the RO page had it under "Apocrita".
  - Leucospidae hosts are given as Megachilidae; the RO page said "albinele artistice".
  - In the RO life cycle, eggs are laid on "pâinea de albine"; the old text said "ceara de albine".
- The garbled "one in four of five" pollination figure was left out.

## Contact

László Zoltán – zoltan.laszlo@ubbcluj.ro
Babeș-Bolyai University, Faculty of Biology and Geology, Cluj-Napoca
