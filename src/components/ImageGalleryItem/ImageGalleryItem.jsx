import PropTypes from 'prop-types';

import { ImageGalleryList, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ tags, webImg, handleSelectedImage }) => {
  return (
    <ImageGalleryList>
      <Img src={webImg} alt={tags} onClick={handleSelectedImage} />
    </ImageGalleryList>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webImg: PropTypes.string.isRequired,
  handleSelectedImage: PropTypes.func,
};
