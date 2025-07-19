import { Widget } from '@/types/theme';
import { Clock } from '@/components/widgets/Clock';
import { Calendar } from '@/components/widgets/Calendar';
import { Weather } from '@/components/widgets/Weather';
import { YearProgress } from '@/components/widgets/YearProgress';

export const widgets: Widget[] = [
  {
    id: 'clock',
    name: 'Clock',
    description: 'A minimalist digital clock widget',
    category: 'Time',
    defaultSize: {
      width: 300,
      height: 200,
    },
    component: Clock,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'A clean monthly calendar view',
    category: 'Time',
    defaultSize: {
      width: 350,
      height: 400,
    },
    component: Calendar,
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Simple weather display widget',
    category: 'Information',
    defaultSize: {
      width: 300,
      height: 250,
    },
    component: Weather,
  },
  {
    id: 'year-progress',
    name: 'Year Progress',
    description: 'Track the progress of year, month, and day',
    category: 'Time',
    defaultSize: {
      width: 350,
      height: 300,
    },
    component: YearProgress,
  },
];