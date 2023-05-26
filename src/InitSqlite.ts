import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';


async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require('../database/polecat.db')).uri,
    FileSystem.documentDirectory + 'SQLite/polecat.db'
  );
  return SQLite.openDatabase('polecat.db');
}

const db = openDatabase();

export default db;