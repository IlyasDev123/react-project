import ContentWrapper from 'shared/components/layout/content-wrapper';
import UpdateOrCreate from 'shared/components/faqs/updateOrCreate';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';

export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Faqs',
      url: '/faqs',
    },
    {
      title: 'Faqs',
      url: 'update',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Card customClass="bg-white mb-10">
        <UpdateOrCreate />
      </Card>
    </ContentWrapper>
  );
}
