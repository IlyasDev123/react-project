import ContentWrapper from 'shared/components/layout/content-wrapper';
import Dashboard from 'shared/components/dashboard';
import Breadcrumb from 'src/shared/components/bread-curm';

export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
  ];

  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Dashboard />
    </ContentWrapper>
  );
}
