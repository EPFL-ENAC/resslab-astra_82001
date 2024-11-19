import csv from 'csvtojson';
import { writeFileSync } from 'fs';

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/data/data.csv')
  .then((jsonObj) => {
    const path = './src/assets/data/data.json';
    const result = [];
    jsonObj.forEach((obj) => {
      result.push({
        'Type': obj.Type,
        'SubType': obj.SubType,
        'Width': obj.Width,
        'Support': obj.Support,
        'Trans': obj.Trans,
        'AE': obj.AE,
        'Traffic': obj.Traffic,
        'Span': obj.Span,
        'ClassOW': obj.ClassOW,
        'Class': obj.Class,
      })
    });
    writeFileSync(path, JSON.stringify(result, null, 2));
    writeFileSync(path, JSON.stringify(result));
    console.log(`data.csv converted successfully to JSON in ${path}`)
  });

