import { IButtonStyles } from './Button.Props';
import { memoizeFunction } from '../../Utilities';
import {
  ITheme,
  getFocusStyle,
  FontSizes
} from '../../Styling';

const noOutline = {
  outline: 0
};

const iconStyle = {
  fontSize: FontSizes.icon,
  margin: '0 4px',
  height: '16px',
  lineHeight: '16px',
  textAlign: 'center',
  verticalAlign: 'middle'
};

/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export const getStyles = memoizeFunction((
  theme: ITheme,
  focusInset: string = '0',
  focusColor: string = theme.palette.neutralSecondary
): IButtonStyles => {

  return {
    root: [
      getFocusStyle(theme, focusInset, focusColor),
      theme.fonts.medium,
      {
        // this transparent border converts to the correct colors in HC mode
        boxSizing: 'border-box',
        border: '1px solid transparent',
        userSelect: 'none',
        display: 'inline-block',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        verticalAlign: 'top',
        padding: '0 16px'
      }
    ],

    rootDisabled: {
      backgroundColor: theme.palette.neutralLighter,
      color: theme.palette.neutralTertiary,
      cursor: 'default',
      pointerEvents: 'none',
      ':hover': noOutline,
      ':focus': noOutline
    },

    flexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },

    icon: iconStyle,

    menuIcon: [
      iconStyle,
      {
        fontSize: FontSizes.small
      }
    ],

    label: {
      margin: '0 4px',
      lineHeight: '100%'
    },

    screenReaderText: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      margin: '-1px',
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      border: 0
    }

  };
});
