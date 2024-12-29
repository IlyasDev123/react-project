import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import { PaginationProvider } from 'src/shared/components/context/pagination/pagination-provider';
import Package from 'shared/components/packages/list';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Packages',
      url: 'packages',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <PaginationProvider>
        <Package />
      </PaginationProvider>
    </ContentWrapper>
  );
}
