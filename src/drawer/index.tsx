import { ComponentProps, CustomEventT } from '@rmwc/base';

import * as React from 'react';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { noop } from '@rmwc/base/utils/noop';
import {
  MDCModalDrawerFoundation,
  MDCDismissibleDrawerFoundation
  // @ts-ignore
} from '@material/drawer';
import { createFocusTrap, FocusTrap } from '@rmwc/base';

/***************************************************************************************
 * Drawer Headers
 ***************************************************************************************/
/** An optional header for the Drawer. */
export const DrawerHeader = componentFactory({
  displayName: 'DrawerHeader',
  classNames: ['mdc-drawer__header']
});

/** An title for the DrawerHeader. */
export const DrawerTitle = componentFactory({
  displayName: 'DrawerTitle',
  classNames: ['mdc-drawer__title']
});

/** A subtitle for the DrawerHeader. */
export const DrawerSubtitle = componentFactory({
  displayName: 'DrawerSubtitle',
  classNames: ['mdc-drawer__subtitle']
});

/***************************************************************************************
 * Drawer Content
 ***************************************************************************************/
/** Content for Drawers. Please note this is an instance of mdc-list by default. You can change this to a a non list container by specifying the tag as 'div' or anything else. */
export const DrawerContent = componentFactory({
  displayName: 'DrawerContent',
  classNames: ['mdc-drawer__content']
});

/***************************************************************************************
 * Drawer Scrim
 ***************************************************************************************/
/**
 * Protects the app's UI from interactions while a modal drawer is open.
 * This is automatically included if you're using React 16 and above.
 * For React 15, you must manually include it immediately after a modal Drawer.
 * */
export const DrawerScrim = ({
  onClick
}: {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}) => <div className="mdc-drawer-scrim" onClick={onClick} />;

/***************************************************************************************
 * DrawerAppContent
 ***************************************************************************************/
/** For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes. */
export const DrawerAppContent = componentFactory({
  displayName: 'DrawerAppContent',
  classNames: ['mdc-drawer-app-content']
});

/***************************************************************************************
 * Drawers
 ***************************************************************************************/
export type DrawerPropsT = {
  /** Opens or closes the Drawer. */
  open?: boolean;
  /** Callback that fires when the Drawer is closed. */
  onClose?: (evt: CustomEventT<void>) => void;
  /** Callback that fires when the Drawer is opened. */
  onOpen?: (evt: CustomEventT<void>) => void;
  /** Makes a dismissible drawer. */
  dismissible?: boolean;
  /** Makes a modal / temporary drawer. */
  modal?: boolean;
} & ComponentProps;

export const DrawerRoot = componentFactory({
  displayName: 'DrawerRoot',
  tag: 'aside',
  classNames: (props: DrawerPropsT) => [
    'mdc-drawer',
    {
      'mdc-drawer--dismissible': props.dismissible,
      'mdc-drawer--modal': props.modal
    }
  ],
  consumeProps: ['dismissible', 'modal']
});

const slidableDrawerFactory = (
  MDCConstructor: MDCModalDrawerFoundation | MDCDismissibleDrawerFoundation,
  displayName: string
) =>
  class extends FoundationComponent<DrawerPropsT> {
    static displayName = displayName;

    static defaultProps = {
      open: false,
      onOpen: noop,
      onClose: noop
    };

    root = this.createElement('root');
    previousFocus: HTMLElement | null = null;
    focusTrap: FocusTrap | null = null;

    constructor(props: DrawerPropsT) {
      super(props);

      ['handleScrimClick', 'handleTransitionEnd', 'handleKeyDown'].forEach(
        k => {
          (this as any)[k] = (this as any)[k].bind(this);
        }
      );
    }

    componentDidMount() {
      super.componentDidMount();
      this.root.el &&
        (this.focusTrap = createFocusTrap(this.root.el, {
          clickOutsideDeactivates: true,
          initialFocus: undefined,
          escapeDeactivates: false,
          returnFocusOnDeactivate: false
        }));
    }

    getDefaultFoundation() {
      /** @type {!MDCDrawerAdapter} */
      const adapter = /** @type {!MDCDrawerAdapter} */ {
        addClass: (className: string) => this.root.addClass(className),
        removeClass: (className: string) => this.root.removeClass(className),
        hasClass: (className: string) => this.root.hasClass(className),
        elementHasClass: (element: HTMLElement, className: string) =>
          element.classList.contains(className),
        saveFocus: () => {
          this.previousFocus = document.activeElement as HTMLElement;
        },
        restoreFocus: () => {
          const previousFocus = this.previousFocus && this.previousFocus.focus;
          if (
            this.root.el &&
            this.root.el.contains(document.activeElement) &&
            previousFocus
          ) {
            this.previousFocus && this.previousFocus.focus();
          }
        },
        focusActiveNavigationItem: () => {
          const activeNavItemEl =
            this.root.el &&
            this.root.el.querySelector(`.mdc-list-item--activated`);
          if (activeNavItemEl) {
            (activeNavItemEl as HTMLElement).focus();
          }
        },
        notifyClose: () => this.emit('onClose', {}, true /* shouldBubble */),
        notifyOpen: () => this.emit('onOpen', {}, true /* shouldBubble */),
        trapFocus: () => this.focusTrap && this.focusTrap.activate(),
        releaseFocus: () => this.focusTrap && this.focusTrap.deactivate()
      };

      return new MDCConstructor(adapter);
    }

    handleScrimClick() {
      this.foundation.handleScrimClick();
    }

    handleKeyDown(evt: React.KeyboardEvent) {
      this.props.onKeyDown && this.props.onKeyDown(evt);
      this.foundation.handleKeydown(evt);
    }

    handleTransitionEnd(evt: React.TransitionEvent) {
      this.props.onTransitionEnd && this.props.onTransitionEnd(evt);
      this.foundation.handleTransitionEnd(evt);
    }

    sync(props: DrawerPropsT, prevProps: DrawerPropsT) {
      if (props.open !== prevProps.open) {
        props.open ? this.foundation.open() : this.foundation.close();
      }
    }

    render() {
      const { onOpen, onClose, open, ...rest } = this.props;
      return (
        <React.Fragment>
          <DrawerRoot
            ref={this.root.setEl}
            {...this.root.props(rest)}
            onKeyDown={this.handleKeyDown}
            onTransitionEnd={this.handleTransitionEnd}
          />
          {rest.modal && <DrawerScrim onClick={this.handleScrimClick} />}
        </React.Fragment>
      );
    }
  };

const ModalDrawer = slidableDrawerFactory(
  MDCModalDrawerFoundation,
  'ModalDrawer'
);
const DismissibleDrawer = slidableDrawerFactory(
  MDCDismissibleDrawerFoundation,
  'dismissibleDrawer'
);

export const Drawer: React.ComponentType<DrawerPropsT> = (
  props: DrawerPropsT
) => {
  if (props.dismissible) {
    return <DismissibleDrawer {...props} />;
  }

  if (props.modal) {
    return <ModalDrawer {...props} />;
  }

  return <DrawerRoot {...props} />;
};

Drawer.displayName = 'Drawer';
