import WorkoutList from 'shared/components/workouts/list';
import ContentWrapper from 'shared/components/layout/content-wrapper';
import Breadcrumb from 'shared/components/bread-curm';
import { PaginationProvider } from 'src/shared/components/context/pagination/pagination-provider';

export default function Index() {
  //name of the component changed from Index to WorkoutList
  const items = [
    {
      title: 'Dashboard',
      url: 'dashboard',
    },
    {
      title: 'Workout',
      url: 'workout',
    },
  ];
  return (
    <ContentWrapper>
      <Breadcrumb items={items} />
      <PaginationProvider>
        <WorkoutList />
      </PaginationProvider>
    </ContentWrapper>
  );
}
