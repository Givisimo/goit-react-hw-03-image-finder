import React from 'react';
import T from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, imageClick }) => (
  <ul className={styles.imageGallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        webformatURL={image.webformatURL}
        id={image.id}
        imageClick={imageClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: T.arrayOf(
    T.shape({ id: T.number.isRequired, webformatURL: T.string.isRequired }),
  ).isRequired,
  imageClick: T.func.isRequired,
};

export default ImageGallery;
