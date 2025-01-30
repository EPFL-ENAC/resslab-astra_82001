import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { App } from 'vue';

import messages from '../i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

export const getNavigatorLanguage = () =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || 'en-US';
export default boot(({ app }: { app: App }) => {
  const i18n = createI18n({
    locale: getNavigatorLanguage().split('-')[0],
    legacy: false,
    messages,
    fallbackLocale: 'en',
    warnHtmlMessage: false,
    wrapperComponent: 'i18n',
    escapeParameter: true,
    useI18nComponentName: true,
    missingWarn: false,
    fallbackWarn: false, // deactivate to see missing keys
  });

  // Set i18n instance on app
  app.use(i18n);
});
