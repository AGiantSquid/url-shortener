import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 1rem;
`;

const Paper = styled.div`
  padding: 3rem;
  text-align: center;
  background: linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%);
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;

const Title = styled.h1`
  color: #90caf9;
  font-size: 4rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #b0bec5;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #90caf9;
  color: #000000;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #64b5f6;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Paper>
        <Title>404</Title>
        <Subtitle>Page Not Found</Subtitle>
        <Description>
          The page you are looking for does not exist or has been moved.
        </Description>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
