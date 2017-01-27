import React from 'react';

interface Props {
  children: React.ReactNode;
  onOuterClick?: () => void;
}

export const ModalHeader = ({ children }: any) =>
  <div className="header">
    {children}
  </div>;

export const ModalContent = ({ children }: any) =>
  <div className="content">
    {children}
  </div>;

export const ModalActions = ({ children }: any) =>
  <div className="actions">
    {children}
  </div>;

export default class Modal extends React.Component<Props, {}> {
  private outer: HTMLDivElement | null;

  handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!this.outer) {
      return;
    }

    const { onOuterClick } = this.props;

    if (event.target === this.outer && onOuterClick) {
      onOuterClick();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div
        ref={el => (this.outer = el)}
        className="ui active page dimmer"
        onClick={this.handleClose}
      >
        <div
          className="ui active modal"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(0, -50%)',
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}
