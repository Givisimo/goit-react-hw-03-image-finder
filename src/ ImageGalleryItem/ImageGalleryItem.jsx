import React from 'react';
import T from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, imageClick, id }) => (
  <li className={styles.imageGalleryItem}>
    <img
      src={webformatURL}
      alt=""
      className={styles.imageGalleryItemImage}
      height="200px"
      onClick={() => imageClick(id)}
      id={id}
      role="presentation"
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: T.string.isRequired,
  imageClick: T.func.isRequired,
  id: T.number.isRequired,
};

export default ImageGalleryItem;
