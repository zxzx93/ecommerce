import { useState } from 'react';
import { ICategories } from 'interfaces/back/Categories.interface';
import { ISubCategories } from 'interfaces/back/SubCategories.interface';
import Categories from 'models/Categories';
import SubCategories from 'models/SubCategories';
import { GetServerSideProps } from 'next';
import db from 'utils/helpers/db';

import Layout from 'components/admin/layout';
import Create from 'components/admin/subCategories/Create';
import List from 'components/admin/subCategories/List';

interface CategoriesProps {
  categoriesData: ICategories[];
  subCategoriesData: ISubCategories[];
}

function subCategories({ categoriesData, subCategoriesData }: CategoriesProps) {
  const [data, setData] = useState(subCategoriesData);

  return (
    <Layout>
      <div>
        <Create categories={categoriesData} setSubCategories={setData} />
        <List
          categories={categoriesData}
          subCategories={data}
          setSubCategories={setData}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  db.connectDb();

  const categoriesData = await Categories.find({})
    .sort({ updatedAt: -1 })
    .lean(); // 모든 카테고리 데이터를 최신 업데이트 순으로 가져옴
  const subCategoriesData = await SubCategories.find({})
    .populate({ path: 'parent', model: Categories })
    .sort({ updateAt: -1 })
    .lean();
  return {
    props: {
      categoriesData: JSON.parse(JSON.stringify(categoriesData)),
      subCategoriesData: JSON.parse(JSON.stringify(subCategoriesData)),
    },
  };
};

export default subCategories;
