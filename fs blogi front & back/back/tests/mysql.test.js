const { test, describe, before, afterEach } = require('node:test')
const mysql = require('../utils/mysql');
const { expect } = require('expect')
 

describe('MySQL:', () => {
  before
  (async () => {
    //luo table
    await mysql.createTable();
    await mysql.populateTable();
  });
 
  afterEach
  (async () => {
    //poista "test_table" testien jälkeen
    await mysql.dropTable();
    mysql.closeDatabase();
  });
 
  test('Tietokantayhteys ja toiminnot ok', async () => {
    const rows = await mysql.readTable();
    expect(rows).toHaveLength(2);
    expect(rows[0].name).toBe('Assi Asynkroninen');
    expect(rows[0].email).toBe('as.async@example.com');
    expect(rows[1].name).toBe('Seppo Synkroninen');
    expect(rows[1].email).toBe('parempi.toiminto@example.com');
  });
});