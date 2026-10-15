import en from './locales/en.js'
import zhCN from './locales/zh-CN.js'
import zhTW from './locales/zh-TW.js'
import ko from './locales/ko.js'
import ja from './locales/ja.js'
import th from './locales/th.js'
import vi from './locales/vi.js'
import fr from './locales/fr.js'

/**
 * Translation dictionaries keyed by language code.
 * Missing keys fall back to the English dictionary.
 */
const translations = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ko,
  ja,
  th,
  vi,
  fr
}

export default translations
