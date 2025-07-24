import { Widget } from '@/types/theme';
import { Clock } from '@/components/widgets/Clock';
import { Calendar } from '@/components/widgets/Calendar';
import { Weather } from '@/components/widgets/Weather';
import { YearProgress } from '@/components/widgets/YearProgress';
import { Quote } from '@/components/widgets/Quote';
import { Countdown } from '@/components/widgets/Countdown';

export const widgets: Widget[] = [
  {
    id: 'clock',
    name: 'Clock',
    description: 'A minimalist digital clock widget',
    category: 'Time',
    icon: '🕐',
    defaultSize: {
      width: 300,
      height: 200,
    },
    notion: {
      width: 3,
      height: 2,
    },
    component: Clock,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'A clean monthly calendar view',
    category: 'Time',
    icon: '📅',
    defaultSize: {
      width: 350,
      height: 400,
    },
    notion: {
      width: 3,
      height: 3,
    },
    component: Calendar,
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Simple weather display widget',
    category: 'Information',
    icon: '☀️',
    defaultSize: {
      width: 300,
      height: 250,
    },
    notion: {
      width: 2,
      height: 2,
    },
    component: Weather,
  },
  {
    id: 'year-progress',
    name: 'Year Progress',
    description: 'Track the progress of year, month, and day',
    category: 'Time',
    icon: '📊',
    defaultSize: {
      width: 350,
      height: 300,
    },
    notion: {
      width: 4,
      height: 2,
    },
    component: YearProgress,
  },
  {
    id: 'quote',
    name: 'Daily Quote',
    description: 'Inspirational quotes that change periodically',
    category: 'Motivation',
    icon: '💭',
    defaultSize: {
      width: 400,
      height: 250,
    },
    notion: {
      width: 4,
      height: 2,
    },
    component: Quote,
  },
  {
    id: 'countdown',
    name: 'Countdown Timer',
    description: 'Countdown to New Year 2025',
    category: 'Time',
    icon: '⏳',
    defaultSize: {
      width: 400,
      height: 200,
    },
    notion: {
      width: 4,
      height: 2,
    },
    component: Countdown,
  },
];