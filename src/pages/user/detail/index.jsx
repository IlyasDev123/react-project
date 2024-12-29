import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import UserDetail from 'shared/components/users/detail';
export default function Detail() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Users',
      url: '/users',
    },
    {
      title: 'Detail',
      url: 'detail',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <UserDetail />
    </ContentWrapper>
  );
}
