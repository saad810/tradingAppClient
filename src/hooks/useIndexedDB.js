import { useEffect, useState, useRef } from 'react';
import { openDB } from 'idb';

const useIndexedDB = (dbName, storeName) => {
  const [data, setData] = useState([]);
  const dbRef = useRef(null);

  // Initialize IndexedDB
  const initDB = async () => {
    dbRef.current = await openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  };

  // Fetch all data from the store
  const fetchAll = async () => {
    const allData = await dbRef.current.getAll(storeName);
    setData(allData);
  };

  // Add a new record
  const addRecord = async (record) => {
    await dbRef.current.add(storeName, record);
    fetchAll(); // Refresh data
  };

  // Update an existing record
  const updateRecord = async (record) => {
    await dbRef.current.put(storeName, record);
    fetchAll(); // Refresh data
  };

  // Delete a record by ID
  const deleteRecord = async (id) => {
    await dbRef.current.delete(storeName, id);
    fetchAll(); // Refresh data
  };

  useEffect(() => {
    initDB().then(fetchAll);
  }, [dbName, storeName]);

  return {
    data,
    addRecord,
    updateRecord,
    deleteRecord,
  };
};

export default useIndexedDB;
