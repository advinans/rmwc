// @flow
import type { SimpleTagPropsT } from '../Base';
import * as React from 'react';
import {
  MDCTab,
  MDCTabBar,
  MDCTabBarScroller
} from '@material/tabs/dist/mdc.tabs';
import { Icon } from '../Icon';
import { simpleTag } from '../Base';
import { withFoundation, syncFoundationProp } from '../Base/MDCFoundation';

function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }

    return fn(child);
  });
}

/******************************************************
 * Private
 *******************************************************/
export const TabBarRoot = simpleTag({
  displayName: 'TabBarRoot',
  tag: 'nav',
  classNames: props => [
    'mdc-tab-bar',
    {
      'mdc-tab-bar-scroller__scroll-frame__tabs': props.isTabScroller
    }
  ],
  consumeProps: ['isTabScroller']
});

export const TabBarIndicator = simpleTag({
  displayName: 'TabBarIndicator',
  tag: 'span',
  classNames: 'mdc-tab-bar__indicator'
});

export const TabBarScrollerRoot = simpleTag({
  displayName: 'TabBarScrollerRoot',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller'
});

export const TabBarScrollerIndicator = simpleTag({
  displayName: 'TabBarScrollerIndicatorBack',
  tag: 'div',
  classNames: props => [
    'mdc-tab-bar-scroller__indicator',
    {
      'mdc-tab-bar-scroller__indicator--back': props.back,
      'mdc-tab-bar-scroller__indicator--forward': props.forward
    }
  ],
  consumeProps: ['forward', 'back']
});

export const TabBarScrollerIndicatorInner = simpleTag({
  displayName: 'TabBarScrollerIndicatorInner',
  tag: Icon,
  classNames: 'mdc-tab-bar-scroller__indicator__inner'
});

export const TabBarScrollerScrollFrame = simpleTag({
  displayName: 'TabBarScrollerScrollFrameEl',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller__scroll-frame'
});

/******************************************************
 * Public
 *******************************************************/

/** A Tab component */
export const Tab = simpleTag({
  displayName: 'Tab',
  classNames: 'mdc-tab'
});

/** A Tab icon. This is an instance of the Icon component. */
export const TabIcon = simpleTag({
  displayName: 'TabIcon',
  tag: Icon,
  classNames: 'mdc-tab__icon'
});

/** Text that goes under a Tab icon */
export const TabIconText = simpleTag({
  displayName: 'TabIconText',
  tag: 'span',
  classNames: 'mdc-tab__icon-text'
});

export type TabBarPropsT = {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onChange?: (evt: { detail: { activeTabIndex: number } }) => mixed,
  /** The index of the active tab. */
  activeTabIndex: number
} & SimpleTagPropsT;

/** The TabBar component */
export class TabBar extends withFoundation({
  constructor: MDCTabBar,
  adapter: {}
})<TabBarPropsT> {
  static displayName = 'TabBar';

  syncWithProps(nextProps: TabBarPropsT) {
    syncFoundationProp(
      nextProps.activeTabIndex,
      this.activeTabIndex,
      () => (this.activeTabIndex = nextProps.activeTabIndex)
    );
  }

  componentDidMount() {
    super.componentDidMount();

    // This corrects an issue where passing in 0 or no activeTabIndex
    // causes the first tab of the set to not be active
    if (
      this.props.activeTabIndex === 0 ||
      this.props.activeTabIndex === undefined
    ) {
      window.requestAnimationFrame(() => {
        this.foundation_.adapter_.setTabActiveAtIndex(0, true);
      });
    }
  }

  componentDidUpdate(prevProps: TabBarPropsT) {
    // Children changing is a pain...
    // We have to perform a lot of cleanup and sometimes we have to reinit
    const childrenDidChange =
      prevProps &&
      prevProps.children &&
      this.props &&
      this.props.children &&
      JSON.stringify(
        React.Children.map(prevProps.children, ({ key }) => key)
      ) !==
        JSON.stringify(
          React.Children.map(this.props.children, ({ key }) => key)
        );

    const tabsLengthMismatch =
      React.Children.toArray(this.props.children).length !== this.tabs.length;

    if (childrenDidChange || tabsLengthMismatch) {
      this.tabs.forEach(mdcTab => {
        mdcTab.foundation_ && mdcTab.foundation_.destroy();
      });
      this.tabs_ = this.gatherTabs_(el => new MDCTab(el));
      this.layout();
      this.syncWithProps(this.props);
    }
  }

  render() {
    const { children, activeTabIndex, apiRef, ...rest } = this.props;
    const { root_ } = this.foundationRefs;

    return (
      <TabBarRoot {...rest} elementRef={root_}>
        {children}
        <TabBarIndicator />
      </TabBarRoot>
    );
  }
}

export type TabBarScrollerPropsT = {
  /** The forward indicator to use, gets passed to the Icon use prop. An SVG has been included by default to work correctly without material-icons. */
  indicatorForward?: React.Node,
  /** The back indicator to use, gets passed to the Icon use prop. An SVG has been included by default to work correctly without material-icons.  */
  indicatorBack?: React.Node,
  /** Children to render */
  children?: React.Node
};

/** The TabBar Scroll container */
export class TabBarScroller extends withFoundation({
  constructor: MDCTabBarScroller,
  adapter: {}
})<TabBarScrollerPropsT> {
  static displayName = 'TabBarScroller';

  static defaultProps = {
    indicatorForward: (
      <svg
        style={{ fill: 'currentColor' }}
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ),
    indicatorBack: (
      <svg
        style={{ fill: 'currentColor' }}
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    )
  };

  initialize() {
    super.initialize(() => this.tabBarApi);
  }

  componentDidUpdate() {
    this.layout();
  }

  render() {
    const { children, indicatorForward, indicatorBack, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    const newChildren = recursiveMap(children, child => {
      if (child.type.displayName && child.type.displayName === 'TabBar') {
        return React.cloneElement(child, {
          ...child.props,
          isTabScroller: true,
          ref: tabBarApi => (this.tabBarApi = tabBarApi)
        });
      }

      return child;
    });

    return (
      <TabBarScrollerRoot {...rest} elementRef={root_}>
        <TabBarScrollerIndicator back>
          <TabBarScrollerIndicatorInner use={indicatorBack} />
        </TabBarScrollerIndicator>
        <TabBarScrollerScrollFrame>{newChildren}</TabBarScrollerScrollFrame>
        <TabBarScrollerIndicator forward>
          <TabBarScrollerIndicatorInner use={indicatorForward} />
        </TabBarScrollerIndicator>
      </TabBarScrollerRoot>
    );
  }
}
