function fetchPincodeDetails() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var inputSheet = ss.getSheetByName("Pincode_input");
  var detailsSheet = ss.getSheetByName("Pincode_details");

  // Get the latest pincode from Pincode_input
  var lastRow = inputSheet.getLastRow();
  var pincode = inputSheet.getRange(lastRow, 1).getValue();

  if (!pincode) {
    Logger.log("No Pincode Found");
    return;
  }

  // India Post API
  var url = "https://api.postalpincode.in/pincode/" + pincode;

  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());

  if (data[0].Status == "Success") {

    var office = data[0].PostOffice[0];

    detailsSheet.appendRow([
      pincode,
      office.District,
      office.State,
      office.Region
    ]);

  } else {

    detailsSheet.appendRow([
      pincode,
      "Invalid",
      "",
      ""
    ]);

  }
}