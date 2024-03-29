import { memo } from 'react';
import styles from 'styles/Icons.module.scss';

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={styles.button}>
      <path d="M22.5 32.35V13.8L16.5 19.8L14.35 17.65L24 8L33.65 17.65L31.5 19.8L25.5 13.8V32.35ZM11 40Q9.8 40 8.9 39.1Q8 38.2 8 37V29.85H11V37Q11 37 11 37Q11 37 11 37H37Q37 37 37 37Q37 37 37 37V29.85H40V37Q40 38.2 39.1 39.1Q38.2 40 37 40Z" />
    </svg>
  );
}

export default memo(UploadIcon);
