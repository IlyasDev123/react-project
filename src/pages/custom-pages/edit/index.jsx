import ContentWrapper from 'shared/components/layout/content-wrapper';
import UpdatePages from 'shared/components/custom-pages/update';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Pages',
      url: '/pages',
    },
    {
      title: 'Update',
      url: 'update',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Card customClass="bg-white mb-10">
        <UpdatePages />
      </Card>
    </ContentWrapper>
  );
}
