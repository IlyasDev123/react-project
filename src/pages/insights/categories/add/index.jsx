import ContentWrapper from 'shared/components/layout/content-wrapper';
import AddCategory from 'shared/components/insights/categories/add';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';
export default function Add() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Categories',
      url: '/categories',
    },
    {
      title: 'Add',
      url: 'add',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Card customClass="bg-white mb-10">
        <AddCategory />
      </Card>
    </ContentWrapper>
  );
}
