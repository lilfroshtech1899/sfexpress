/**
 * Region / language catalogue for the tracking portal.
 *
 * Each region lists the languages offered for that region, in priority order.
 * The first language is used as the default when a region is selected.
 * English (en) is always appended if it is not already present so every
 * region offers an English option.
 */

export const LANGUAGES = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ko: '한국어',
  ja: '日本語',
  th: 'ภาษาไทย',
  vi: 'Tiếng Việt',
  fr: 'Français'
}

/** BCP-47 locale used for date/number formatting per language. */
export const LANG_LOCALE = {
  en: 'en-GB',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  ko: 'ko-KR',
  ja: 'ja-JP',
  th: 'th-TH',
  vi: 'vi-VN',
  fr: 'fr-FR'
}

/** Ensure the English option is always available for a region. */
function withEnglish(langs) {
  return langs.includes('en') ? langs : [...langs, 'en']
}

const REGION_SOURCE = [
  { label: '中国内地 Chinese Mainland', langs: ['zh-CN'] },
  { label: '中国香港/中国澳門 HongKong China /Macau China', langs: ['zh-TW', 'zh-CN'] },
  { label: '新加坡 Singapore', langs: ['en', 'zh-CN'] },
  { label: '韩国 Korea', langs: ['ko', 'zh-CN'] },
  { label: '马来西亚 Malaysia', langs: ['zh-CN'] },
  { label: '日本 Japan', langs: ['ja', 'zh-CN'] },
  { label: '美国/加拿大 United States/Canada', langs: ['zh-CN'] },
  { label: '英国 United Kingdom', langs: ['zh-CN'] },
  { label: '泰国 Thailand', langs: ['th', 'zh-CN'] },
  { label: '越南 Vietnam', langs: ['vi', 'zh-CN'] },
  { label: '澳大利亚/新西兰 Australia/New Zealand', langs: ['zh-CN'] },
  { label: '法国 France', langs: ['fr', 'zh-CN'] },
  { label: '德国 Germany', langs: ['zh-CN'] },
  { label: '印度尼西亚 Indonesia', langs: ['zh-CN'] },
  { label: '菲律宾 Philippines', langs: ['zh-CN'] }
]

export const REGIONS = REGION_SOURCE.map((region) => ({
  label: region.label,
  langs: withEnglish(region.langs)
}))

export const DEFAULT_REGION_INDEX = 0
