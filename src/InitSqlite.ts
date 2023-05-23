import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('my.db'); // Opens database, it will be created if it doesn't already exist

export default db;