import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import { PaginationProvider } from 'src/shared/components/context/pagination/pagination-provider';
import Categories from 'shared/components/insights/categories/index';
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
      <PaginationProvider>
        <Categories />
      </PaginationProvider>
    </ContentWrapper>
  );
}
