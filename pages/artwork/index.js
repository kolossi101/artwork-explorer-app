import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error, isLoading } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList === null || artworkList === undefined) {
    return null;
  }

  return (
    <>
      <Row className="gy-4 d-flex justify-content-center">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col xs={12} sm={6} md={4} lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>Nothing Here</Card.Title>
              <Card.Text>Try searching for something else...</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
      <br />
      {artworkList.length > 0 ? (
        <Row className="gy-4 d-flex justify-content-center">
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex justify-content-center"
          >
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
}
