import PropTypes from 'prop-types';

import { ImageGalleryList, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags }) => (
  <ImageGalleryList key={id}>
    <Img src={webformatURL} alt={tags} data-url={largeImageURL} />
  </ImageGalleryList>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
