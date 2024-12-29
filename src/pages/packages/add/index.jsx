import ContentWrapper from 'shared/components/layout/content-wrapper';
import AddPackage from 'shared/components/packages/add';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';
export default function Add() {
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
      title: 'Add',
      url: 'add',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Card customClass="bg-white mb-10">
        <AddPackage />
      </Card>
    </ContentWrapper>
  );
}
