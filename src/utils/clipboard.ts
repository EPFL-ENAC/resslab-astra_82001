import { copyToClipboard } from  'quasar';

interface NotifyOptions {
  message: string;
  color: 'primary' | 'negative';
}

interface QuasarInstance {
  notify: (options: NotifyOptions) => void;
}

interface TranslateFunction {
  (key: string): string;
}

export function copyText($q: QuasarInstance, $t: TranslateFunction, textToCopy: number): Promise<void> {
  return copyToClipboard(textToCopy.toString())
    .then(() => {
      // Optional: show success message
      $q.notify({
        message: $t('copied_to_clipboard_success'),
        color: 'primary'
      })
    })
    .catch(() => {
      $q.notify({
        message: $t('copied_to_clipboard_failure'),
        color: 'negative'
      })
    })
}
