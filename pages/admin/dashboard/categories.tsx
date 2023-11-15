import { useState } from 'react';
import { ICategories } from 'interfaces/back/Categories.interface';
import Categories from 'models/Categories';
import { GetServerSideProps } from 'next';
import db from 'utils/helpers/db';

import Create from 'components/admin/categories/Create';
import List from 'components/admin/categories/List';
import Layout from 'components/admin/layout';

interface CategoriesProps {
  categoriesData: ICategories[];
}

function categories({ categoriesData }: CategoriesProps) {
  const [data, setData] = useState(categoriesData);

  return (
    <Layout>
      <div>
        <Create setCategories={setData} />
        <List categories={data} setCategories={setData} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  db.connectDb();

  const categoriesData = await Categories.find({})
    .sort({ updatedAt: -1 })
    .lean(); // 모든 카테고리 데이터를 최신 업데이트 순으로 가져옴

  return {
    props: {
      categoriesData: JSON.parse(JSON.stringify(categoriesData)),
    },
  };
};

export default categories;
