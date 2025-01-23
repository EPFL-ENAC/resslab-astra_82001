import csv from 'csvtojson';
import { writeFileSync } from 'fs';

csv({ checkType: true, ignoreEmpty: true, trim: true })
  .fromFile('./src/assets/data/data.csv')
  .then((jsonObj) => {
    const path = './src/assets/data/data.json';
    const result = [];
    jsonObj.forEach((obj) => {
      result.push({
        'VerificationType': obj['Verification type'],
        'Type': obj.Type,
        'SubType': obj.SubType,
        'Traffic': obj['Lane configuration'],
        'Width': obj.Width,
        'Support': obj.Support,
        'Trans': obj['Positioning of internal forces influence line'],
        'AE': obj['Action effect'],
        'Span': obj.Span,
        // alpha_Q1,global","alpha_Q2,global","alpha_q,global Class+","alpha_q,global Class","alpha_Q1,local","alpha_Q2,local
        'Q1G': obj['alpha_Q1,global'],
        'Q2G': obj['alpha_Q2,global'],
        'qG+': obj['alpha_q,global Class+'],
        'qG': obj['alpha_q,global Class'],
        'Q1L': obj['alpha_Q1,local'],
        'Q2L': obj['alpha_Q2,local']
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

