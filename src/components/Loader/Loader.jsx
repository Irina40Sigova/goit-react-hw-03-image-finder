import { Dna } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export const Loader = () => {
  return (
    <Container>
      <Dna visible={false} height={200} width={200} ariaLabel="dna-loading" />
    </Container>
  );
};

//  btnCheck() {
//     if (this.state.totalHits <= 12 * this.page) {
//       this.setState({ btn: false });
//     }
//   }
