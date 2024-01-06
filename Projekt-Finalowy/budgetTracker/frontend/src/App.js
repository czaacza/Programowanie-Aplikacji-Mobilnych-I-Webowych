import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import LoginRegisterPopup from './Components/LoginRegisterPopup/LoginRegisterPopup';
import './i18n';
import axios from 'axios';

function App() {
  const [active, setActive] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const { getUser, user, setUser } = useGlobalContext();

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        userData
      );
      const { token, userId } = response.data;

      if (response.status !== 200) {
        throw new Error('Invalid credentials');
      }

      // Store the JWT token and userId in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      getUser(userId);

      // Update the login state
      setIsLoggedIn(true);
      setUserId(userId);
    } catch (error) {
      console.error('Login error:', error.response || error);
    }
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard userId={userId} />;
      case 2:
        return <Income userId={userId} />;
      case 3:
        return <Expenses userId={userId} />;
      default:
        return <Dashboard userId={userId} />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App" isLoggedIn={isLoggedIn}>
      {/* Main layout and contents */}
      {/* render MainLayout if userId is loaded */}
      <MainLayout>
        <Navigation
          active={active}
          setActive={setActive}
          user={user}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
        <main>{displayData()}</main>
      </MainLayout>
      {/* Overlay the login popup if not logged in */}
      {!isLoggedIn && (
        <LoginRegisterPopup
          isOpen={!isLoggedIn}
          onClose={() => setIsLoggedIn(false)}
          onLogin={handleLogin}
        />
      )}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: #c1d3fe;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #abc4ff;
    backdrop-filter: blur(4.5px);
    border-radius: 10px;
    overflow-x: hidden;
  }

  &:before {
    content: '';
    display: ${(props) => (props.isLoggedIn ? 'none' : 'block')};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
  }
`;

export default App;
