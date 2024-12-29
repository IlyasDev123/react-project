import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import PackageDetail from 'shared/components/packages/show';
export default function Detail() {
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
      title: 'Detail',
      url: 'detail',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <PackageDetail />
    </ContentWrapper>
  );
}
