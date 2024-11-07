import csv from 'csvtojson';
import { writeFileSync } from 'fs';

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/data/data.csv')
  .then((jsonObj) => {
    const path = './src/assets/data/data.json';
    writeFileSync(path, JSON.stringify(jsonObj, null, 2));
    console.log(`data.csv converted successfully to JSON in ${path}`)
  });

