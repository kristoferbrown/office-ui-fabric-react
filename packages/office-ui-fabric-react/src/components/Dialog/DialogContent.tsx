import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { IDialogContentProps } from './Dialog.Props';
import { IconButton } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import * as stylesImport from './Dialog.scss';
const styles: any = stylesImport;

export interface IDialogContnetState {
  id?: string;
}

@withResponsiveMode
export class DialogContent extends BaseComponent<IDialogContentProps, IDialogContnetState> {

  public static defaultProps: IDialogContentProps = {
    showCloseButton: false,
    className: '',
    topButtonsProps: []
  };

  constructor(props: IDialogContentProps) {
    super(props);

    this.state = {
      id: getId('Dialog'),
    };
  }

  public render() {
    let {
      showCloseButton,
      closeButtonAriaLabel,
      onDismiss,
      subText,
      title
    } = this.props;
    let { id } = this.state;

    let groupings = this._groupChildren();
    let subTextContent;
    if (subText) {
      subTextContent = <p className={ css('ms-Dialog-subText', styles.subText) } id={ id + '-subText' }>{ subText }</p>;
    }

    return (
      <div>
        <div className={ css('ms-Dialog-header', styles.header) }>
          <p className={ css('ms-Dialog-title', styles.title) } id={ id + '-title' } role='heading'>{ title }</p>
          <div className={ css('ms-Dialog-topButton', styles.topButton) }>
            { this.props.topButtonsProps.map((props) => (
              <IconButton {...props} />
            )) }
            <IconButton
              className={ css(
                'ms-Dialog-button ms-Dialog-button--close',
                styles.button,
                { [styles.isClose]: !showCloseButton }
              ) }
              iconProps={ { iconName: 'Cancel' } }
              ariaLabel={ closeButtonAriaLabel }
              onClick={ onDismiss }
            />
          </div>
        </div>
        <div className={ css('ms-Dialog-inner', styles.inner) }>
          <div className={ css('ms-Dialog-content', styles.content, this.props.className) }>
            { subTextContent }
            { groupings.contents }
          </div>
          { groupings.footers }
        </div>
      </div>
    );
  }

  // @TODO - typing the footers as an array of DialogFooter is difficult because
  // casing "child as DialogFooter" causes a problem because
  // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
  private _groupChildren(): { footers: any[]; contents: any[]; } {

    let groupings: { footers: any[]; contents: any[]; } = {
      footers: [],
      contents: []
    };

    React.Children.map(this.props.children, child => {
      if (typeof child === 'object' && child !== null && child.type === DialogFooter) {
        groupings.footers.push(child);
      } else {
        groupings.contents.push(child);
      }
    });

    return groupings;
  }
}
