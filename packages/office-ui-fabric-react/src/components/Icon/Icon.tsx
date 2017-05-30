/* tslint:disable */
import * as React from 'react';
/* tslint:enable */

import { IIconProps, IconType } from './Icon.Props';
import { Image } from '../Image/Image';
import {
  css,
  getNativeProps,
  htmlElementProperties
} from '../../Utilities';
import { IconClassNames } from '../../Styling';
import { getStyles } from './Icon.styles';

export function Icon(props: IIconProps): JSX.Element {
  let {
    ariaLabel,
    className,
    styles: customStyles,
    iconName
   } = props;
  let styles = getStyles(undefined, customStyles);

  if (props.iconType === IconType.image || props.iconType === IconType.Image) {
    let containerClassName = css(
      'ms-Icon',
      'ms-Icon-imageContainer',
      styles.root,
      styles.imageContainer,
      className
    );

    return (
      <div className={
        css(
          containerClassName,
          styles.root
        ) }
      >
        l  <Image { ...props.imageProps as any } />
      </div>
    );
  } else {
    let iconMemberName = iconName ? iconName.charAt(0).toLowerCase() + iconName.substr(1) : '';

    return (
      <i
        aria-label={ ariaLabel }
        { ...(ariaLabel ? {} : {
          role: 'presentation',
          'aria-hidden': true
        }) }
        { ...getNativeProps(props, htmlElementProperties) }
        className={
          css(
            'ms-Icon',
            IconClassNames[iconMemberName],
            styles.root,
            props.className
          ) }
      />
    );
  }
}