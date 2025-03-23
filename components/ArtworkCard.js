import useSWR from 'swr';
import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ArtworkCard({ objectID }) {
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  

  if (error || !data) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Img
          variant="top"
          src={
            data.primaryImageSmall
              ? data.primaryImageSmall
              : 'https://placehold.co/375x375?text=Not+Available'
          }
        />
        <Card.Body>
          <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date: </strong>
            {data.objectDate ? data.objectDate : 'N/A'}
            <br />
            <strong>Classification: </strong>
            {data.classification ? data.classification : 'N/A'}
            <br />
            <strong>Medium: </strong>
            {data.medium ? data.medium : 'N/A'}
            <br />
            <br />
            <Link href={`/artwork/${data.objectID}`} passHref>
              <Button variant="primary">
                <strong>ID:</strong> {data.objectID}
              </Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
