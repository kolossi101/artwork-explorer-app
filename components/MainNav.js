import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MainNav() {
  const [searchField, setSearchField] = useState('');
  const router = useRouter();

  function doSearch(e) {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand>Nadiia Geras</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link href="#home">Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link href="#link">Advanced Search</Nav.Link>
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={doSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
