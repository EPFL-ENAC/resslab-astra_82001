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
    writeFileSync(path, JSON.stringify(result));
    console.log(`data.csv converted successfully to JSON in ${path}`)
  });


csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/data/internationalization.csv')
  .then((jsonObj) => {
    const langs = ['en', 'fr', 'de', 'it'];
    const result_lang = {
      en: {},
      fr: {},
      de: {},
      it: {},
    };
    // fill the object with each value
    jsonObj.forEach((obj) => {
      // id,en,fr,de,it,desc_en,desc_fr,desc_de,desc_it
      result_lang['en'][obj.id] = obj.en;
      result_lang['en'][obj.id + '_desc'] = obj.desc_en;
      result_lang['fr'][obj.id] = obj.fr;
      result_lang['fr'][obj.id + '_desc'] = obj.desc_fr;
      result_lang['de'][obj.id] = obj.de;
      result_lang['de'][obj.id + '_desc'] = obj.desc_de;
      result_lang['it'][obj.id] = obj.it;
      result_lang['it'][obj.id + '_desc'] = obj.desc_it;
    });

    langs.forEach((lang) => {
      const path = `./src/assets/data/internationalization_${lang}.json`;
      writeFileSync(path, JSON.stringify(result_lang[lang]));
      console.log(`internationalization.csv converted successfully to JSON in ${path}`)
    });
  });

