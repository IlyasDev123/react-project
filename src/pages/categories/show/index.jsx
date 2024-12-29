import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import InsightDetail from 'shared/components/insights/show';
export default function Detail() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Insights',
      url: '/insights',
    },
    {
      title: 'Detail',
      url: 'detail',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <InsightDetail />
    </ContentWrapper>
  );
}
