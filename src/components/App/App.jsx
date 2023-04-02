import React, { Component } from 'react';

import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchApi from 'components/services/fetchApi';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,

    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  fetchImages = () => {
    this.setState({ loading: true });
    fetchApi(this.state.searchQuery, this.state.page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  toggleModal = (modalData = null) => {
    this.setState({
      modalData: modalData,
    });
  };

  render() {
    const { images, loading, error, modalData } = this.state;
    return (
      <Container>
        <Searchbar handleSearchFormSubmit={this.handleSearchFormSubmit} />
        {error &&
          Notify.failure(`Sorry something went wrong: ${error.message}`)}

        {loading && <Loader />}

        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}

        {images.length > 0 && !loading && (
          <Button loadMore={this.fetchImages} />
        )}

        {modalData && (
          <Modal onClose={this.toggleModal}>
            <img src={modalData.largeImageURL} alt={modalData.tags} />
          </Modal>
        )}
      </Container>
    );
  }
}
