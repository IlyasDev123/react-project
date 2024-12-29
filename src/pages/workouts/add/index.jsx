import ContentWrapper from 'shared/components/layout/content-wrapper';
import AddWorkout from 'shared/components/workouts/add';
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
      title: 'Add',
      url: 'add',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <Card customClass="bg-white mb-10">
        <AddWorkout />
      </Card>
    </ContentWrapper>
  );
}
