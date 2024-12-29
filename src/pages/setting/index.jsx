import ContentWrapper from 'shared/components/layout/content-wrapper';
import ProfileDetail from 'shared/components/profile/profile-detail';
import UpdateProfile from 'shared/components/profile/update-profile';
import ChangePassword from 'shared/components/profile/change-password';
import Breadcrumb from 'shared/components/bread-curm';

export default function Setting() {
  const items = [
    {
      title: 'Dashboard',
      url: 'dashboard',
    },
    {
      title: 'Setting',
      url: 'setting',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <ProfileDetail />
        </div>
        <div className="md:col-span-8">
          {/* <Card customClass="bg-white"> */}
          <UpdateProfile />
          <ChangePassword />
          {/* </Card> */}
        </div>
      </div>
    </ContentWrapper>
  );
}
