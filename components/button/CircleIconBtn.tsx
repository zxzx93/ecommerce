import { BiRightArrowAlt } from 'react-icons/bi';

import styles from './styles.module.scss';

interface ButtonProps {
  buttonType: JSX.IntrinsicElements['button']['type'];
  text: string;
}

function CircleIconBtn({ buttonType, text }: ButtonProps) {
  return (
    <button className={styles.button} type={buttonType}>
      {text}
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
}

export default CircleIconBtn;
