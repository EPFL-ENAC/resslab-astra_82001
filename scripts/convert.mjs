import csv from 'csvtojson';
import { writeFileSync } from 'fs';

const widthToMeters = (widthKey) => ({
  wid18: 18,
  wid12: 12,
  wid9: 9,
  Wid108: 10.8,
  Wid9: 9,
  Wid18: 18,
  Wid1_22: 1.22,
  Wid2_33: 2.33,
  Wid3_44: 3.44,
  Wid4_56: 4.56,
  Wid5_67: 5.67,
  Wid6_78: 6.78,
  Wid3: 3,
  Wid7_5: 7.5,
  Wid12: 12,
}[widthKey]);

// Verification type, Type, SubType, Lane configuration, Width, Support, Positioning of internal forces influence line, Action effect, Span, "?Q1,global", "?Q2,global", "?q,global Class+", "?q,global Class", "?Q1,local", "?Q2,local"
// Longitudinal, Box, Composite, Uni2L, 12, Simp, p0, V, 20, 0.55, 0.35, 0.38258716, 0.22219018, 0.55, 0.4

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
        'Q1G': obj['?Q1,global'],
        'Q2G': obj['?Q2,global'],
        'qG+': obj['?q,global Class+'],
        'qG': obj['?q,global Class'],
        'Q1L': obj['?Q1,local'],
        'Q2L': obj['?Q2,local']
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

