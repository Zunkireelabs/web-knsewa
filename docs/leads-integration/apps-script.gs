/**
 * KNSEWA website contact form → Google Sheet + email notification.
 *
 * Setup:
 * 1. Create a Google Sheet (e.g. "KNSEWA Website Leads") under hardik@zunkireelabs.com.
 * 2. In that sheet: Extensions -> Apps Script, delete the placeholder code, paste this file's contents.
 * 3. Run `setupSheet` once (Apps Script editor -> select "setupSheet" in the function dropdown -> Run)
 *    to create the header row. Grant permissions when prompted.
 * 4. Deploy -> New deployment -> type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy, authorize again if asked, then copy the Web app URL — that's what the
 *    website's contact form will submit to.
 * 5. Send that URL back so it can be wired into the site.
 *
 * Change NOTIFY_EMAIL below if leads should go to a different address than info@knsewa.com.
 */

var NOTIFY_EMAIL = 'info@knsewa.com';
var SHEET_NAME = 'Leads';
var HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Project Type', 'Message'];

function setupSheet() {
  var sheet = getOrCreateSheet();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: a hidden field real visitors never fill in. If it has a
    // value, silently pretend success so the bot moves on, but skip the
    // sheet row and email entirely.
    if (data.website) {
      return jsonResponse({ success: true });
    }

    if (!data.name || !data.email || !data.message) {
      return jsonResponse({ success: false, error: 'Missing required fields.' });
    }

    var timestamp = new Date();
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.projectType || '',
      data.message || '',
    ]);

    var subject = 'New Website Inquiry — ' + (data.projectType || 'General');
    var body =
      'New contact form submission from knsewa.com\n\n' +
      'Name: ' + (data.name || '') + '\n' +
      'Email: ' + (data.email || '') + '\n' +
      'Phone: ' + (data.phone || '') + '\n' +
      'Company: ' + (data.company || '') + '\n' +
      'Project Type: ' + (data.projectType || '') + '\n\n' +
      'Message:\n' + (data.message || '') + '\n\n' +
      'Submitted: ' + timestamp.toString();

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body,
      replyTo: data.email,
    });

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'KNSEWA leads endpoint is running.' });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
