import ContentWrapper from 'shared/components/layout/content-wrapper';
import UpdateWorkout from 'shared/components/workouts/edit';
import Card from 'shared/components/card';
import Breadcrumb from 'src/shared/components/bread-curm';
export default function Index() {
  const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      title: 'Workout',
      url: '/workouts',
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
        <UpdateWorkout />
      </Card>
    </ContentWrapper>
  );
}
