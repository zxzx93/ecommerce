import { ICategories } from 'interfaces/back/Categories.interface';

import ListItem from './ListItem';

import styles from './styles.module.scss';

interface ListProps {
  categories: ICategories[];
  setCategories: (newCategories: ICategories[]) => void;
}

function List({ categories, setCategories }: ListProps) {
  return (
    <div className={styles.list}>
      {categories.map(category => (
        <ListItem
          key={category._id}
          category={category}
          setCategories={setCategories}
        />
      ))}
    </div>
  );
}

export default List;
