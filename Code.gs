/**
 * BeeHost – data sheet receiver (Google Apps Script)
 *
 * Setup (once):
 *  1. Create a Google Sheet (e.g. "BeeHost adatok"). Extensions → Apps Script. Paste this file.
 *  2. Project Settings → Script properties → add PASSWORD = the volunteer password
 *     (the same password whose SHA-256 hash is PASS_HASH in adatlap.html).
 *  3. Deploy → New deployment → type "Web app".
 *     Execute as: Me.  Who has access: Anyone.  → Deploy, authorise, copy the web app URL.
 *  4. Paste the URL into SCRIPT_URL in adatlap.html and upload the file to GitHub.
 * Optional: run setupSheet() once to format the sheet, and createGoogleForm() to build a matching Google Form.
 * After editing this script, use Deploy → Manage deployments → Edit → New version (the URL stays the same).
 */
const SHEET_NAME = 'Adatok';
const FIELDS = ['observer','email','hotel_id','district','address','placement','floor','orientation',
  'date','time','weather',
  'plug1','plug2','plug3','plug4','plug5','plug6','plug7','plug8','plug9','plug_other','open_tubes',
  'insects','photos','notes','lang'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const pw = PropertiesService.getScriptProperties().getProperty('PASSWORD');
    if (!pw || d.token !== pw) return out_({ ok: false, error: 'auth' });
    if (!d.observer || !d.hotel_id || !d.date) return out_({ ok: false, error: 'missing fields' });
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    const header = ['received'].concat(FIELDS);
    if (sh.getLastRow() === 0) sh.appendRow(header);
    sh.appendRow(header.map(function (c) {
      if (c === 'received') return new Date();
      const v = d[c];
      return v === undefined || v === null ? '' : String(v).slice(0, 2000);
    }));
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* ---------- One-click helpers (run from the Apps Script editor: select the function, press Run) ---------- */

/** setupSheet: creates the "Adatok" tab with a frozen, formatted header row and readable column widths. */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  const header = ['received'].concat(FIELDS);
  if (sh.getLastRow() === 0) sh.appendRow(header);
  sh.getRange(1, 1, 1, header.length).setFontWeight('bold').setBackground('#2A2940').setFontColor('#FFFFFF');
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, header.length);
  sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
}

/** createGoogleForm: builds a Google Form with the same questions as adatlap.html (Hungarian / Romanian / English labels)
 *  and links it to this spreadsheet. Responses arrive in a separate tab ("Form Responses 1").
 *  Use it as a backup for volunteers who cannot use the web page. The form log prints its edit and public URLs. */
function createGoogleForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const f = FormApp.create('BeeHost – adatfelvételi lap / fișa de date / data sheet');
  f.setDescription('Egy lap = egy ellenőrzés. / O fișă = o verificare. / One sheet = one check.');
  f.setCollectEmail(false).setProgressBar(true);
  const t = (hu, ro, en) => hu + ' / ' + ro + ' / ' + en;
  f.addSectionHeaderItem().setTitle(t('Ki és hol?', 'Cine și unde?', 'Who and where?'));
  f.addTextItem().setTitle(t('Név', 'Nume', 'Name')).setRequired(true);
  f.addTextItem().setTitle('E-mail');
  f.addTextItem().setTitle(t('Hotel azonosító', 'Codul hotelului', 'Hotel ID')).setHelpText('BH-001').setRequired(true);
  f.addTextItem().setTitle(t('Városrész', 'Cartier', 'District')).setRequired(true);
  f.addTextItem().setTitle(t('Utca vagy koordináták', 'Stradă sau coordonate', 'Street or coordinates'));
  f.addMultipleChoiceItem().setTitle(t('Elhelyezés', 'Amplasare', 'Placement'))
    .setChoiceValues([t('erkély', 'balcon', 'balcony'), t('kert', 'grădină', 'garden'), t('egyéb', 'altele', 'other')]).setRequired(true);
  f.addTextItem().setTitle(t('Emelet', 'Etaj', 'Floor')).setValidation(FormApp.createTextValidation().requireWholeNumber().build());
  f.addListItem().setTitle(t('Tájolás', 'Orientare', 'Facing')).setChoiceValues(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']);
  f.addPageBreakItem().setTitle(t('Ellenőrzés', 'Verificare', 'Check'));
  f.addDateItem().setTitle(t('Dátum', 'Data', 'Date')).setRequired(true);
  f.addTimeItem().setTitle(t('Időpont', 'Ora', 'Time'));
  f.addMultipleChoiceItem().setTitle(t('Időjárás', 'Vremea', 'Weather'))
    .setChoiceValues([t('napos', 'însorit', 'sunny'), t('felhős', 'noros', 'cloudy'), t('esős', 'ploios', 'rainy')]);
  f.addPageBreakItem().setTitle(t('Lezárt csövek', 'Tuburi astupate', 'Sealed tubes'))
    .setHelpText(t('Az összes jelenleg lezárt cső', 'Toate tuburile astupate acum', 'All tubes sealed now'));
  const plugs = [
    ['1 Hylaeus communis', t('celofánszerű hártya', 'membrană ca celofanul', 'cellophane-like membrane')],
    ['2 Osmia leaiana', t('növényi pép', 'pastă vegetală', 'plant pulp')],
    ['3 Osmia brevicornis', t('növényi pép', 'pastă vegetală', 'plant pulp')],
    ['4 Megachile rotundata', t('levél- vagy sziromdarabok', 'bucăți de frunze sau petale', 'leaf or petal pieces')],
    ['5 Osmia florisomnis', t('durva sárdugó', 'dop de noroi grosier', 'coarse mud plug')],
    ['6 Osmia cornuta', t('finom sárdugó', 'dop de noroi fin', 'fine mud plug')],
    ['7 Hoplitis adunca', t('gyanta, fényes', 'rășină, lucioasă', 'resin, glossy')],
    ['8 Hoplitis adunca', t('gyanta, matt', 'rășină, mată', 'resin, matt')],
    ['9 Osmia bicornis', t('sárdugó', 'dop de noroi', 'mud plug')],
    ['?', t('ismeretlen vagy egyéb dugó', 'dop necunoscut sau altul', 'unknown or other plug')],
    ['0', t('nyitott (üres) csövek', 'tuburi deschise (goale)', 'open (empty) tubes')]];
  const num = FormApp.createTextValidation().requireWholeNumber().build();
  plugs.forEach(p => f.addTextItem().setTitle(p[0] + ' – ' + p[1]).setValidation(num));
  f.addPageBreakItem().setTitle(t('Megfigyelések', 'Observații', 'Observations'));
  f.addCheckboxItem().setTitle(t('Látott rovarok', 'Insecte văzute', 'Insects seen')).setChoiceValues([
    t('faliméhek', 'albine zidar', 'mason bees'), t('levélvágók', 'tăietoare de frunze', 'leafcutter bees'),
    t('álarcos méhek', 'albine mascate', 'masked bees'), t('darazsak', 'viespi', 'wasps'),
    t('fürkészek, fémdarazsak', 'ichneumonide, viespi smarald', 'ichneumons, cuckoo wasps'), t('egyéb rovar', 'altă insectă', 'other insect')]);
  f.addTextItem().setTitle(t('Fotók linkje', 'Link către fotografii', 'Link to photos'));
  f.addParagraphTextItem().setTitle(t('Megjegyzés', 'Observații', 'Notes'));
  f.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  Logger.log('Edit: ' + f.getEditUrl());
  Logger.log('Share with volunteers: ' + f.getPublishedUrl());
}

function doGet() { return out_({ ok: true, service: 'BeeHost data sheet' }); }

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
