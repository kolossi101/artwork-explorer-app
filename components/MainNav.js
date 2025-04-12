import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const tokenStored = readToken();
    console.log(tokenStored);
    setToken(tokenStored);
    if (tokenStored) {
      setUserName(tokenStored.userName);
    }
  }, [router.pathname]);

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  async function doSearch(e) {
    setIsExpanded(false);
    e.preventDefault();
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  function handleToggle() {
    setIsExpanded(!isExpanded);
  }

  function handleLink() {
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="fixed-top"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Nadiia Geras</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggle}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={handleLink} active={router.pathname === '/'}>
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleLink}
                    active={router.pathname === '/search'}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
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
            )}
            &nbsp;
            {token ? (
              <Nav>
                <NavDropdown
                  title={userName || 'User Name'}
                  id="basic-nav-dropdown"
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={handleLink}
                      active={router.pathname === '/favourites'}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={handleLink}
                      active={router.pathname === '/history'}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleLink}
                    active={router.pathname === '/login'}
                  >
                    Login
                  </Nav.Link>
                </Link>

                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={handleLink}
                    active={router.pathname === '/register'}
                  >
                    Register
                  </Nav.Link>
                </Link>
              </Nav>
            )}
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
