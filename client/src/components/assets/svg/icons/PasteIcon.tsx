import { memo } from 'react';
import styles from 'styles/Icons.module.scss';

function PasteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={styles.button}>
      <path d="M9 42q-1.3 0-2.15-.85Q6 40.3 6 39V9q0-1.3.85-2.15Q7.7 6 9 6h10.1q.35-1.75 1.725-2.875T24 2q1.8 0 3.175 1.125Q28.55 4.25 28.9 6H39q1.3 0 2.15.85Q42 7.7 42 9v30q0 1.3-.85 2.15Q40.3 42 39 42Zm0-3h30V9h-3v4.5H12V9H9v30ZM24 9q.85 0 1.425-.575Q26 7.85 26 7q0-.85-.575-1.425Q24.85 5 24 5q-.85 0-1.425.575Q22 6.15 22 7q0 .85.575 1.425Q23.15 9 24 9Z" />
    </svg>
  );
}

export default memo(PasteIcon);
