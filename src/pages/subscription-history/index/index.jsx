import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import { PaginationProvider } from 'src/shared/components/context/pagination/pagination-provider';
import SubscriptionHistory from 'shared/components/subscription-history/index';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Subscription History',
      url: 'subscription-history',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <PaginationProvider>
        <SubscriptionHistory />
      </PaginationProvider>
    </ContentWrapper>
  );
}
