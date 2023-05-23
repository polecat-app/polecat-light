import { SQLTransaction } from "expo-sqlite";
import db from "../InitSqlite";

async function getRegionFromLocation(locaction: location, setRegion: Function) {
  // const response = await supabase.rpc("__get_ecoregion_from_location", {
  //   ...locaction,
  // });
  console.log(db);
  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS MyTable (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT);",
      [],
      (tx, results) => {
        console.log("Table created successfully");
      },
      (tx, error) => {
        console.error("Error: ", error);
        return true; // Stop the transaction if there was an error
      }
    );
  });

  db.readTransaction((tx: SQLTransaction) => {
    tx.executeSql(
      "SELECT * FROM MyTable",
      [],
      (tx, results) => {
        console.log("Query completed");
      },
      (tx, error) => {
        console.error("Error: ", error);
        return true; // Stop the transaction if there was an error
      }
    );
  });

  const response = {};
  if (
    response &&
    response.data &&
    // @ts-ignore
    response.data.eco_code &&
    // @ts-ignore
    response.data.ecoregion_name
  ) {
    // @ts-ignore
    const eco_code = response.data.eco_code;
    // @ts-ignore
    const ecoregion_name = response.data.ecoregion_name;
    setRegion({ eco_code: eco_code, name: ecoregion_name });
  } else {
    setRegion(null);
  }
}

export { getRegionFromLocation };
