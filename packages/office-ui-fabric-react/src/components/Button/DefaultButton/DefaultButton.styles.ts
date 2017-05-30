import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  getTheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getBaseButtonStyles
} from '../BaseButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles,
  focusInset?: string,
  focusColor?: string
): IButtonStyles => {
  let baseButtonStyles: IButtonStyles = getBaseButtonStyles(theme, focusInset, focusColor);
  let defaultButtonStyles: IButtonStyles = {
    root: {
      minWidth: DEFAULT_BUTTON_MINWIDTH,
      height: DEFAULT_BUTTON_HEIGHT,
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralPrimary
    },

    rootHovered: {
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.black
    },

    rootPressed: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    rootChecked: {
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white
    },

    label: {
      fontWeight: 'bold' // theme.fontWeights.semibold,
    }

  };

  return mergeStyleSets(baseButtonStyles, defaultButtonStyles, customStyles);
});
