import ContentWrapper from 'shared/components/layout/content-wrapper';
import UpdatePackage from 'shared/components/packages/update';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Packages',
      url: '/packages',
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
        <UpdatePackage />
      </Card>
    </ContentWrapper>
  );
}
