import csv from 'csvtojson';
import { writeFileSync } from 'fs';

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/data/data.csv')
  .then((jsonObj) => {
    const path = './src/assets/data/data.json';
    writeFileSync(path, JSON.stringify(jsonObj, null, 2));
    console.log(`data.csv converted successfully to JSON in ${path}`)
    console.log('images path updated from \'image.png\' to \'/images/image.png')
    console.log('receiver_coordinates path updated from \'lat, long\' to \'[long, lat]\'')
  });

