import { IButtonStyles } from '../Button.Props';
import {
  ITheme,
  getTheme,
  mergeStyleSets
} from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import {
  getStyles as getDefaultButtonStyles
} from '../DefaultButton/DefaultButton.styles';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_MINWIDTH = '80px';
const DEFAULT_PADDING = '0 16px';

export const getStyles = memoizeFunction((
  theme: ITheme = getTheme(),
  customStyles?: IButtonStyles
): IButtonStyles => {
  let defaultButtonStyles: IButtonStyles = getDefaultButtonStyles(
    theme,
    customStyles
  );
  let compoundButtonStyles: IButtonStyles = {
    root: {
      maxWidth: '280px',
      minHeight: '72px',
      height: 'auto',
      padding: '20px'
    },

    flexContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      minWidth: '100%',
      margin: ''
    },

    label: {
      margin: '0 0 5px',
      lineHeight: '100%'
    },

    description: [
      theme.fonts.small,
      {
        color: theme.palette.neutralSecondary,
        lineHeight: '100%'
      }
    ],

    descriptionHovered: {
      color: theme.palette.neutralDark
    },

    descriptionPressed: {
      color: 'inherit'
    },

    descriptionChecked: {
      color: 'inherit'
    },

    descriptionDisabled: {
      color: 'inherit'
    }

  };

  return mergeStyleSets(defaultButtonStyles, compoundButtonStyles, customStyles);
});
