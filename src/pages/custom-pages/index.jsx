import CustomPage from 'shared/components/custom-pages/index';
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
      title: 'Pages',
      url: 'pages',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <CustomPage />
    </ContentWrapper>
  );
}
