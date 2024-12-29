import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import SubscriptionDetail from 'shared/components/subscription-history/show';
export default function Detail() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Subscription History',
      url: '/subscriptions',
    },
    {
      title: 'Detail',
      url: 'detail',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <SubscriptionDetail />
    </ContentWrapper>
  );
}
