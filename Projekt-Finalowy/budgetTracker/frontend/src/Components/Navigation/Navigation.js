import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar-placeholder.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
// import LoginRegisterPopup from '../LoginRegisterPopup/LoginRegisterPopup'; // Adjust the path as needed
import './Navigation.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Navigation({ active, setActive, user, setUser, setIsLoggedIn }) {
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Update the application state
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <NavStyled className="nav-styled">
      <div className="user-con">
        <img src={avatar} alt="" />
        <div className="text">
          <h2>{user ? user.username : ''}</h2>
          <li className="signout-button" onClick={handleLogout}>
            {user && (
              <>
                {signout} {/* If signout is a JSX element */}
                {t('sign_out')}
              </>
            )}
          </li>
        </div>
      </div>
      <li>
        Language <LanguageSwitcher />
      </li>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{t(`${item.title.toLowerCase()}`)}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li></li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav``;

export default Navigation;
