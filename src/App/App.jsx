import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import api from '../Services/api';
import Button from '../Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Modal from '../Modal/Modal';
import styles from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    pageNumber: 1,
    isLoading: false,
    imageLarge: null,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, images } = this.state;
    if (prevState.query !== query) {
      this.fetchImgs();
    }
    if (prevState.images.length !== images.length) {
      this.scroll();
    }
  }

  scroll = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

  onSubmit = query => {
    this.setState({ query, pageNumber: 1, images: [] });
  };

  fetchImgs = () => {
    const { query, pageNumber } = this.state;
    this.setState({ isLoading: true });
    api
      .fetchImgs(query, pageNumber)
      .then(data => {
        this.setState(state => ({
          images: [...state.images, ...data],
          pageNumber: state.pageNumber + 1,
        }));
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  onImgClick = id => {
    const { images } = this.state;
    const image = images.find(item => item.id === id);
    this.setState({ imageLarge: image.largeImageURL });
    this.openModal();
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { images, isLoading, imageLarge, isModalOpen } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <div className={styles.loader}>
          {isLoading && (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          )}
        </div>

        {images.length > 0 && (
          <ImageGallery images={images} imageClick={this.onImgClick} />
        )}

        {images.length > 0 && <Button loadMore={this.fetchImgs} />}
        {isModalOpen && (
          <Modal imageLarge={imageLarge} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
