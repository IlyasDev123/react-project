import ContentWrapper from 'shared/components/layout/content-wrapper';
import AddInsight from 'shared/components/insights/add';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';
export default function Add() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Inside',
      url: '/insights',
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
        <AddInsight />
      </Card>
    </ContentWrapper>
  );
}
