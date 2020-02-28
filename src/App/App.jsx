import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import api from '../Services/api';
import Button from '../Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Modal from '../Modal/Modal';
import styles from './App.module.css';

const App = () => {
  const [images, handleImgs] = useState([]);

  const [query, handleQuery] = useState('');

  const [pageNumber, hanldePageNumber] = useState(1);

  const [isLoading, handleIsLoading] = useState(false);

  const [imageLarge, handleImageLarge] = useState(null);

  const [isModalOpen, handleModalOpen] = useState(false);

  useEffect(() => {
    fetchImgs();
  }, [query]);

  // useEffect(() => {
  //   scroll();
  // }, [images.length]);

  const scroll = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

  const onSubmit = newQuery => {
    handleQuery(newQuery);
    hanldePageNumber(1);
    handleImgs([]);
  };

  const fetchImgs = () => {
    handleIsLoading(true);
    api
      .fetchImgs(query, pageNumber)
      .then(data => {
        handleImgs(prevState => [...prevState, ...data]);
        hanldePageNumber(prevState => prevState + 1);
      })
      .catch(err => console.log(err))
      .finally(() => handleIsLoading(false));
  };

  const onImgClick = id => {
    const image = images.find(item => item.id === id);
    handleImageLarge(image.largeImageURL);
    openModal();
  };

  const openModal = () => handleModalOpen(true);

  const closeModal = () => {
    handleImageLarge('');
    handleModalOpen(false);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onSubmit} />
      <div className={styles.loader}>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        )}
      </div>

      {images.length > 0 && (
        <ImageGallery images={images} imageClick={onImgClick} />
      )}

      {images.length > 0 && <Button loadMore={fetchImgs} />}
      {isModalOpen && <Modal imageLarge={imageLarge} onClose={closeModal} />}
    </div>
  );
};

export default App;
