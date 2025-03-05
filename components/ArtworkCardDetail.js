import useSWR from 'swr';
import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error || !data) {
    return (
      <>
        <Error statusCode={404} />
      </>
    );
  }
  return (
    <>
      <Card>
        {data.primaryImage && (
          <Card.Img
            variant="top"
            src={
              data.primaryImage
                ? data.primaryImage
                : 'https://placehold.co/375x375?text=Not+Available'
            }
          />
        )}

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
            <strong>Artist: </strong>
            {data.artistDisplayName ? (
              <>
                {data.artistDisplayName} (
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  wiki
                </a>
                )
              </>
            ) : (
              'N/A'
            )}
            <br />
            <strong>Credit Line: </strong>
            {data.creditLine ? data.creditLine : 'N/A'}
            <br />
            <strong>Dimensions: </strong>
            {data.dimensions ? data.dimensions : 'N/A'}
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
