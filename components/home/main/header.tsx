import styles from './styles.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <img
            src='https://ae01.alicdn.com/kf/H8dbcfb1054224c7291068bfb9aa89ec5R/197x22.png_.webp'
            alt='m'
          />
        </li>
        <li>
          <img
            src='https://ae01.alicdn.com/kf/H63b3b8451f994550b0a91d407378e81ae/158x22.png_.webp'
            alt='m'
          />
        </li>
        <li>
          <img
            src='https://ae01.alicdn.com/kf/H17662e104f494a42951925228e7081bep/159x22.png_.webp'
            alt='m'
          />
        </li>
      </ul>
    </div>
  );
}

export default Header;
