import { extractSheets } from "spreadsheet-to-json"

export const getStoreItems = () => {

  extractSheets(
    {
      // your google spreadhsheet key
      spreadsheetKey: "1l2YilJsbBPG4d1hPX6PrVTXsqpUX06AEWIkh1Q6ecec",
      // your google oauth2 credentials or API_KEY
      credentials: require(
        '../secret.json'
      ),
      // optional: names of the sheets you want to extract
      sheetsToExtract: ["orders"],
    },
    function (err: Error, data: any) {
      console.log("data", data);
    }
  );
}
