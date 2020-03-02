import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';
import styles from './Modal.module.css';

const MODAL_ROOT = document.querySelector('#modal-root');

const Modal = ({ imageLarge, onClose }) => {
  const modalRef = useRef();

  const handleKeypress = e => {
    if (e.code !== 'Escape') {
      return;
    }
    onClose();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  }, [handleKeypress]);

  const handleCloseModal = e => {
    const { current } = modalRef;
    if (current && e.target !== current) {
      return;
    }
    onClose();
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleCloseModal}
      ref={modalRef}
      role="presentation"
    >
      <div className={styles.modal}>
        <img src={imageLarge} alt="" />
      </div>
    </div>,
    MODAL_ROOT,
  );
};

Modal.propTypes = {
  imageLarge: T.string.isRequired,
  onClose: T.func.isRequired,
};

// class Modal extends Component {
//   state = {
//     url: this.props.imageLarge,
//   };
//
//   static propTypes = {
//     imageLarge: T.string.isRequired,
//     onClose: T.func.isRequired,
//   };
//
//   modalRef = createRef();
//
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeypress);
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeypress);
//   }
//
//   handleKeypress = e => {
//     const { onClose } = this.props;
//     if (e.code !== 'Escape') {
//       return;
//     }
//     onClose();
//   };
//
//   handleCloseModal = e => {
//     const { current } = this.modalRef;
//     const { onClose } = this.props;
//     if (current && e.target !== current) {
//       return;
//     }
//     onClose();
//   };
//
//   render() {
//     const { url } = this.state;
//     return createPortal(
//       <div
//         className={styles.overlay}
//         onClick={this.handleCloseModal}
//         ref={this.modalRef}
//         role="presentation"
//       >
//         <div className={styles.modal}>
//           <img src={url} alt="" />
//         </div>
//       </div>,
//       MODAL_ROOT,
//     );
//   }
// }

export default Modal;
