import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../app/page.module.css";
import { useNavigate } from 'react-router-dom';

const TMDBAuth = ({ onLogin }) => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Get request token
      const requestToken = await getRequestToken();

      // Validate login with the request token
      const validated = await validateWithLogin(requestToken, username, password);

      if (validated) {
        // Create session with the validated request token
        const sessionId = await createSession(requestToken);
        setSessionId(sessionId);
        onLogin(); // Call the onLogin callback to update authentication state
        navigate('/movies');
      } else {
        alert('Invalid username or password');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoading(false);
    }
  };

  const handleAuthentication = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get('request_token');
    const approved = urlParams.get('approved');

    if (approved === 'true' && requestToken) {
      const sessionId = await createSession(requestToken);
      setSessionId(sessionId);
      navigate('/movies'); // Redirect to movies page after successful login
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/authenticated') {
      handleAuthentication();
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.authenticatingWrapper}>
        <div className={styles.spinner}></div>
        <div className={styles.authenticatingMessage}>Authenticating...</div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {sessionId ? (
        <div>
          <h2>Authenticated</h2>
          <p>Session ID: {sessionId}</p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className="d-flex justify-content-center h-100">
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>Sign In</h3>
                <div className={styles.socialIcon}>
                  <span><i className="fab fa-facebook-square"></i></span>
                  <span><i className="fab fa-google-plus-square"></i></span>
                  <span><i className="fab fa-twitter-square"></i></span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                  <div className="inputGroupFormGroup">
                    <div className="inputGroupPrepend">
                      <span className="inputGroupText"><i className="fas fa-user"></i></span>
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control"
                      placeholder="username"
                      required
                    />
                  </div>
                  <div className={styles.input}>
                    <input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      placeholder="password"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input type="submit" value="Login" className={styles.loginBtn} />
                  </div>
                </form>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TMDBAuth;

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzRiMzU3NTk4MDcwM2U3NDRjNGFjOTA0ODE0M2IyMiIsIm5iZiI6MTcyMjM1NTk1OC45MDI0MzgsInN1YiI6IjY2YThhZTUzYjI3MWZmZjlkMmEzNmNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mREa355Lgwmi-VlHyYusf4FZcDOzYgUN3ZwXqTv-jv4';

const getRequestToken = async () => {
  const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  const data = await response.json();
  return data.request_token;
};

const validateWithLogin = async (requestToken, username, password) => {
  const response = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      request_token: requestToken
    })
  });
  const data = await response.json();
  return data.success;
};

const createSession = async (requestToken) => {
  const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      request_token: requestToken
    })
  });
  const data = await response.json();
  return data.session_id;
};
