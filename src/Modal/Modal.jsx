import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';
import styles from './Modal.module.css';

const MODAL_ROOT = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    url: this.props.imageLarge,
  };

  static propTypes = {
    imageLarge: T.string.isRequired,
    onClose: T.func.isRequired,
  };

  modalRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeypress);
  }

  handleKeypress = e => {
    const { onClose } = this.props;
    if (e.code !== 'Escape') {
      return;
    }
    onClose();
  };

  handleCloseModal = e => {
    const { current } = this.modalRef;
    const { onClose } = this.props;
    if (current && e.target !== current) {
      return;
    }
    onClose();
  };

  render() {
    const { url } = this.state;
    return createPortal(
      <div
        className={styles.overlay}
        onClick={this.handleCloseModal}
        ref={this.modalRef}
        role="presentation"
      >
        <div className={styles.modal}>
          <img src={url} alt="" />
        </div>
      </div>,
      MODAL_ROOT,
    );
  }
}

export default Modal;
