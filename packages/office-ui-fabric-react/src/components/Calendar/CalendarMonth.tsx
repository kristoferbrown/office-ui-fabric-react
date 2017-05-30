import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  getRTL
} from '../../Utilities';
import { ICalendarStrings } from './Calendar.Props';
import { FocusZone } from '../../FocusZone';
import { addYears, setMonth } from '../../utilities/dateMath/DateMath';
import { Icon } from '../../Icon';
import * as stylesImport from './Calendar.scss';
const styles: any = stylesImport;

export interface ICalendarMonthProps {
  navigatedDate: Date;
  strings: ICalendarStrings;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
}

export class CalendarMonth extends BaseComponent<ICalendarMonthProps, {}> {
  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: ICalendarMonthProps) {
    super(props);

    this._selectMonthCallbacks = [];
    props.strings.shortMonths.map((month, index) => {
      this._selectMonthCallbacks[index] = this._onSelectMonth.bind(this, index);
    });

    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);
  }

  public render() {

    let { navigatedDate, strings } = this.props;

    return (
      <div className={ css('ms-DatePicker-monthPicker', styles.monthPicker) }>
        <div className={ css('ms-DatePicker-header', styles.header) }>
          <div className={ css(
            'ms-DatePicker-yearComponents ms-DatePicker-navContainer',
            styles.yearComponents,
            styles.navContainer
          ) }>
            <span
              className={ css('ms-DatePicker-prevYear js-prevYear', styles.prevYear) }
              onClick={ this._onSelectPrevYear }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectPrevYear) }
              aria-label={ strings.prevYearAriaLabel }
              role='button'
              tabIndex={ 0 }>
              <Icon iconName={ getRTL() ? 'chevronRight' : 'chevronLeft' } />
            </span>
            <span
              className={ css('ms-DatePicker-nextYear js-nextYear', styles.nextYear) }
              onClick={ this._onSelectNextYear }
              onKeyDown={ this._onKeyDown.bind(this, this._onSelectNextYear) }
              aria-label={ strings.nextYearAriaLabel }
              role='button'
              tabIndex={ 0 }>
              <Icon iconName={ getRTL() ? 'chevronLeft' : 'chevronRight' } />
            </span>
          </div>
          <div className={ css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear) }>{ navigatedDate.getFullYear() }</div>
        </div>
        <FocusZone>
          <div className={ css('ms-DatePicker-optionGrid', styles.optionGrid) }>
            { strings.shortMonths.map((month, index) =>
              <span
                role='button'
                className={ css('ms-DatePicker-monthOption', styles.monthOption) }
                key={ index }
                onClick={ this._selectMonthCallbacks[index] }
                aria-label={ setMonth(navigatedDate, index).toLocaleString([], { month: 'long', year: 'numeric' }) }
                data-is-focusable={ true }
              >
                { month }
              </span>
            ) }
          </div>
        </FocusZone>
      </div>
    );
  }

  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  private _onSelectNextYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  };

  private _onSelectPrevYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  };

  private _onSelectMonth(newMonth: number) {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
  }
}
