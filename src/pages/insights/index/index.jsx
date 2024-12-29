import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import { PaginationProvider } from 'src/shared/components/context/pagination/pagination-provider';
import Insight from 'shared/components/insights/index';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Insight',
      url: 'insight',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <PaginationProvider>
        <Insight />
      </PaginationProvider>
    </ContentWrapper>
  );
}
