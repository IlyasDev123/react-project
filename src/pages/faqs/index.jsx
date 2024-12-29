import Faqs from 'shared/components/faqs/index';
import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';

export default function Index() {
  //name of the component changed from Index to WorkoutList
  const items = [
    {
      title: 'Dashboard',
      url: 'dashboard',
    },
    {
      title: 'Faqs',
      url: 'faqs',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Faqs />
    </ContentWrapper>
  );
}
