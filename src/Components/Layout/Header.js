import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';
import AuthContext from '../../store/auth-context';


function Header() {

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToHomeHandler = () => {
    navigate('/');
  }

  const logoutHandler = (event) => {
    event.preventDefault();
    authCtx.logoutHandler();
    navigate('/');
  }
  const leaderboardHandler = () => {
    navigate('/leaderboard');
  };
  return (
    <Navbar bg="light px-3">
      <Container>
        <Navbar.Brand className='hover-overlay bg-transparent' onClick={navigateToHomeHandler}>E-Learning</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link onClick={navigateToHomeHandler}>Home</Nav.Link>
          <Nav.Link onClick={leaderboardHandler}>Leaderboard</Nav.Link>
          <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          <Nav.Link href='https://forms.gle/ceX5XJ51BiT2k1wp9' className='text-primary' target='__blank'>Feedback</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;