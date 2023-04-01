import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchApi from 'components/services/fetchApi';

import { Container } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,

    images: [],

    selectedImage: null,
    alt: null,

    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const nextQuery = this.state.query;
    const nextPage = this.state.page;
    if (prevState.query !== nextQuery || prevState.page !== nextPage) {
    }
    try {
      const response = await fetchApi(nextQuery, nextPage);
      this.setState({ images: response.hits });
    } catch (error) {
      Notify.failure(`Sorry something went wrong. ${error.message}`);
      this.setState({ error: error.message });
    }
  }

  handleSearchFormSubmit = query => {
    this.setState({ query, images: [], nextPage: 1 });
  };

  handleSelectedImage = (largeImageURL, tags) => {
    this.setState({ selectedImage: largeImageURL, alt: tags });
  };

  render() {
    const { images } = this.state;
    return (
      <Container>
        <Searchbar handleSearchFormSubmit={this.handleSearchFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            handleSelectedImage={this.handleSelectedImage}
          />
        )}
        <Loader />
      </Container>
    );
  }
}
