import { ICategories } from 'interfaces/back/Categories.interface';
import { ISubCategories } from 'interfaces/back/SubCategories.interface';

import ListItem from './ListItem';

import styles from './styles.module.scss';

interface ListProps {
  categories: ICategories[];
  subCategories: ISubCategories[];
  setSubCategories: (newCategories: ISubCategories[]) => void;
}

function List({ categories, subCategories, setSubCategories }: ListProps) {
  return (
    <div className={styles.list}>
      {subCategories.map(subCategory => (
        <ListItem
          key={subCategory._id}
          categories={categories}
          subCategory={subCategory}
          setSubCategories={setSubCategories}
        />
      ))}
    </div>
  );
}

export default List;
