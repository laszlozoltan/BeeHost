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

function doGet() { return out_({ ok: true, service: 'BeeHost data sheet' }); }

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
