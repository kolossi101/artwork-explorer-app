import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ArtworkCard from '@/components/ArtworkCard';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { useEffect } from 'react';

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    console.log('Updated favouritesList:', favouritesList);
  }, [favouritesList, setFavouritesList]);

  if (!favouritesList) return null;

  return (
    <>
      <Row className="gy-4 d-flex justify-content-center">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>Nothing Here</Card.Title>
              <Card.Text>Try adding a new artwork to the list</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
      <br />
    </>
  );
}
