import React, { useState } from 'react';
import LoginForm from '../Forms/LoginForm'; // Adjust path as needed
import RegisterForm from '../Forms/RegisterForm'; // Adjust path as needed
import './LoginRegisterPopup.css'; // Ensure you have this for styling
import '../Forms/Forms.css'; // Ensure you have this for styling

const LoginRegisterPopup = ({ isOpen, onClose, onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView(!isLoginView);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="popup-content">
          {isLoginView ? (
            <>
              <LoginForm onLogin={onLogin} /> {/* Pass onLogin to LoginForm */}
              <p className="toggle-form">
                Don't have an account?{' '}
                <span onClick={toggleView}>Register</span>
              </p>
            </>
          ) : (
            <>
              <RegisterForm
                onRegister={(data) => console.log('Register', data)}
              />
              <p className="toggle-form">
                Already have an account? <span onClick={toggleView}>Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPopup;
