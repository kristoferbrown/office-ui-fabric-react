import { IFontStyles, IRawStyle } from '../interfaces/index';
import { fontFace } from '../glamorExports';
import {
  getLanguage
} from '@uifabric/utilities/lib/index';

// Default urls.
const DefaultFontUrl = 'https://static2.sharepointonline.com/files/fabric/assets/fonts';
const DefaultIconUrl = 'https://static2.sharepointonline.com/files/fabric/assets/icons';

// Fallback fonts, if specified system or web fonts are unavailable.
const FontFamilyFallbacks = `-apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`;

// Font face names to be registered.
const FontNameArabic = 'Segoe UI Web (Arabic)';
const FontNameCyrillic = 'Segoe UI Web (Cyrillic)';
const FontNameEastEuropean = 'Segoe UI Web (East European)';
const FontNameGreek = 'Segoe UI Web (Greek)';
const FontNameHebrew = 'Segoe UI Web (Hebrew)';
const FontNameThai = 'Leelawadee UI Web';
const FontNameVietnamese = 'Segoe UI Web (Vietnamese)';
const FontNameWestEuropean = 'Segoe UI Web (West European)';
const FontNameSelawik = 'Selawik Web';

// Font families with fallbacks, for the general regions.
const FontFamilyArabic = `'${FontNameArabic}'`;
const FontFamilyChineseSimplified = `'Microsoft Yahei', Verdana, Simsun`;
const FontFamilyChineseTraditional = `'Microsoft Jhenghei', Pmingliu`;
const FontFamilyCyrillic = `'${FontNameCyrillic}'`;
const FontFamilyEastEuropean = `'${FontNameEastEuropean}'`;
const FontFamilyGreek = `'${FontNameGreek}'`;
const FontFamilyHebrew = `'${FontNameHebrew}'`;
const FontFamilyHindi = `'Nirmala UI'`;
const FontFamilyJapanese = `'Yu Gothic', 'Meiryo UI', Meiryo, 'MS Pgothic', Osaka`;
const FontFamilyKorean = `'Malgun Gothic', Gulim`;
const FontFamilySelawik = `'${FontNameSelawik}'`;
const FontFamilyThai = `'Leelawadee UI Web', 'Kmer UI'`;
const FontFamilyVietnamese = `'${FontNameVietnamese}'`;
const FontFamilyWestEuropean = `'${FontNameWestEuropean}'`;

// Mapping of language prefix to to font family.
const LanguageToFontMap = {
  'ar': FontFamilyArabic,
  'bg': FontFamilyCyrillic,
  'cs': FontFamilyEastEuropean,
  'el': FontFamilyGreek,
  'et': FontFamilyEastEuropean,
  'he': FontFamilyHebrew,
  'hi': FontFamilyHindi,
  'hr': FontFamilyEastEuropean,
  'hu': FontFamilyEastEuropean,
  'ja': FontFamilyJapanese,
  'kk': FontFamilyEastEuropean,
  'ko': FontFamilyKorean,
  'lt': FontFamilyEastEuropean,
  'lv': FontFamilyEastEuropean,
  'pl': FontFamilyEastEuropean,
  'ru': FontFamilyCyrillic,
  'sk': FontFamilyEastEuropean,
  'sr-latn': FontFamilyEastEuropean,
  'th': FontFamilyThai,
  'tr': FontFamilyEastEuropean,
  'uk': FontFamilyCyrillic,
  'vi': FontFamilyVietnamese,
  'zh-hans': FontFamilyChineseSimplified,
  'zh-hant': FontFamilyChineseTraditional,
};

// Standard font sizes.
export namespace FontSizes {
  export const mini = '10px';
  export const xSmall = '11px';
  export const small = '12px';
  export const smallPlus = '13px';
  export const medium = '14px';
  export const mediumPlus = '15px';
  export const icon = '16px';
  export const large = '17px';
  export const xLarge = '21px';
  export const xxLarge = '28px';
  export const superLarge = '42px';
  export const mega = '72px';
}

// Standard font weights.
export namespace FontWeights {
  export const light = 100;
  export const semilight = 300;
  export const regular = 400;
  export const semibold = 600;
  export const bold = 700;
}

// Standard font styling.
export const DefaultFontStyles: IFontStyles = {
  tiny: _createFont(FontSizes.mini, FontWeights.semibold),
  xSmall: _createFont(FontSizes.xSmall, FontWeights.regular),
  small: _createFont(FontSizes.small, FontWeights.regular),
  smallPlus: _createFont(FontSizes.smallPlus, FontWeights.regular),
  medium: _createFont(FontSizes.medium, FontWeights.regular),
  mediumPlus: _createFont(FontSizes.mediumPlus, FontWeights.regular),
  large: _createFont(FontSizes.large, FontWeights.semilight),
  xLarge: _createFont(FontSizes.xLarge, FontWeights.light),
  xxLarge: _createFont(FontSizes.xxLarge, FontWeights.light),
  superLarge: _createFont(FontSizes.superLarge, FontWeights.light),
  mega: _createFont(FontSizes.mega, FontWeights.light),
  icon: {
    fontFamily: '"FabricMDL2Icons"',
    fontWeight: FontWeights.regular,
    fontStyle: 'normal'
  }
};

function _getFontFamily(): string {
  let language = getLanguage();
  let fontFamily = FontFamilyWestEuropean;

  for (let lang in LanguageToFontMap) {
    if (LanguageToFontMap.hasOwnProperty(lang) && lang.indexOf(language) === 0) {
      fontFamily = LanguageToFontMap[lang];
      break;
    }
  }

  return `${fontFamily}, ${FontFamilyFallbacks}`;
}

function _createFont(size: string, weight: number): IRawStyle {
  return {
    fontFamily: _getFontFamily(),
    '-moz-osx-font-smoothing': 'grayscale',
    '-ms-high-contrast-adjust': 'none',
    '-webkit-font-smoothing': 'antialiased',
    fontSize: size,
    fontWeight: weight
  };
}

function _registerFontFace(
  fontFamily: string,
  url: string,
  fontWeight?: number
): void {
  fontFamily = `'${fontFamily}'`;

  fontFace({
    fontFamily,
    src:
    `url('${url}.woff2') format('woff2'),` +
    `url('${url}.woff') format('woff')`,
    fontWeight,
    fontStyle: 'normal'
  });
}

function _registerFontFaceSet(
  fontFamily: string,
  cdnFolder: string,
  cdnFontName: string = 'segoeui'
): void {
  const urlBase = `${DefaultFontUrl}/${cdnFolder}/${cdnFontName}`;

  _registerFontFace(fontFamily, urlBase + '-light', FontWeights.light);
  _registerFontFace(fontFamily, urlBase + '-semilight', FontWeights.semilight);
  _registerFontFace(fontFamily, urlBase + '-regular', FontWeights.regular);
  _registerFontFace(fontFamily, urlBase + '-semibold', FontWeights.semibold);
}

function _registerDefaultFontFaces(): void {
  // Produce @font-face definitions for all supported web fonts.
  _registerFontFaceSet(FontNameThai, 'leelawadeeui-thai', 'leelawadeeui');
  _registerFontFaceSet(FontNameArabic, 'segoeui-arabic');
  _registerFontFaceSet(FontNameCyrillic, 'segoeui-cyrillic');
  _registerFontFaceSet(FontNameEastEuropean, 'segoeui-easteuropean');
  _registerFontFaceSet(FontNameGreek, 'segoeui-greek');
  _registerFontFaceSet(FontNameHebrew, 'segoeui-hebrew');
  _registerFontFaceSet(FontNameVietnamese, 'segoeui-vietnamese');
  _registerFontFaceSet(FontNameWestEuropean, 'segoeui-westeuropean');
  _registerFontFaceSet(FontFamilySelawik, 'selawik', 'selawik');

  // Leelawadee UI (Thai) does not have a 'light' weight, so we override
  // the font-face generated above to use the 'semilight' weight instead.
  _registerFontFace('Leelawadee UI Web', `${DefaultFontUrl}/leelawadeeui-thai/leelawadeeui-semilight`, FontWeights.light);

  // Leelawadee UI (Thai) does not have a 'semibold' weight, so we override
  // the font-face generated above to use the 'bold' weight instead.
  _registerFontFace('Leelawadee UI Web', `${DefaultFontUrl}/leelawadeeui-thai/leelawadeeui-bold`, FontWeights.semibold);

  _registerFontFace('FabricMDL2Icons', DefaultIconUrl + '/fabricmdl2icons', FontWeights.regular);
}

_registerDefaultFontFaces();