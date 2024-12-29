import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import WorkoutDetail from 'shared/components/workouts/show';
export default function Detail() {
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
      title: 'Detail',
      url: 'detail-workout',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <WorkoutDetail />
    </ContentWrapper>
  );
}
