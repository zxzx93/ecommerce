import { DotLoader as Loader } from 'react-spinners';

import styles from './styles.module.scss';

interface LoaderProps {
  loading: boolean;
}

function DotLoaderSpinner({ loading }: LoaderProps) {
  return (
    <div className={styles.loader}>
      <Loader color='#34F8D1' loading={loading} />
    </div>
  );
}

export default DotLoaderSpinner;
