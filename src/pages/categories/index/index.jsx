import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import Categories from 'shared/components/categories/index';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Categories',
      url: 'categories',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Categories />
    </ContentWrapper>
  );
}
