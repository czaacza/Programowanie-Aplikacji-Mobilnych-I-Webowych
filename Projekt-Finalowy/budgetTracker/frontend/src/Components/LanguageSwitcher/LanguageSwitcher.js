import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ukFlag from '../../img/uk-flag.webp';
import plFlag from '../../img/pl-flag.png';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <StyledLanguageSwitcher>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>
          <img src={ukFlag} alt="English" />
        </button>
        <button onClick={() => changeLanguage('pl')}>
          <img src={plFlag} alt="Polski" />
        </button>
      </div>
    </StyledLanguageSwitcher>
  );
}

const StyledLanguageSwitcher = styled.div`
  .language-switcher {
    display: flex;
    align-items: center;
    gap: 0rem;
    margin-bottom: 1rem;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;

    margin: 0 5px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #f0f0f0;
  }

  img {
    height: 20px; /* Adjust size as needed */
    width: auto;
  }
`;

export default LanguageSwitcher;
