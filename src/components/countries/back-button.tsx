import { useNavigate } from 'react-router';

import styles from './back-button.module.css';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);

          return;
        }

        navigate('/');
      }}
    >
      Back
    </button>
  );
}
