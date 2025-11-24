import React from 'react';
import { Widget } from '@/types/theme';
import { Clock as ClockComponent } from '@/components/widgets/Clock';
import { Calendar as CalendarComponent } from '@/components/widgets/Calendar';
import { Weather as WeatherComponent } from '@/components/widgets/Weather';
import { YearProgress as YearProgressComponent } from '@/components/widgets/YearProgress';
import { Quote as QuoteComponent } from '@/components/widgets/Quote';
import { Countdown as CountdownComponent } from '@/components/widgets/Countdown';
import { Pomodoro as PomodoroComponent } from '@/components/widgets/Pomodoro';
import {
  Clock,
  Calendar,
  CloudSun,
  BarChart3,
  Quote,
  Hourglass,
  Timer
} from 'lucide-react';

// Notion Block Frame Standards:
// - Notion pages have max-width ~900px for full content
// - Embed blocks fit within page width and maintain aspect ratios
// - Standard embed size is around 700-800px wide
// - Grid system uses proportional columns (12-column layout)
// - Typical block heights: 200-400px for compact, 400-600px for expanded

export const widgets: Widget[] = [
  {
    id: 'clock',
    name: 'Clock',
    description: 'A minimalist digital clock widget',
    category: 'Time',
    icon: <Clock className="w-full h-full" />,
    defaultSize: {
      width: 600,  // Notion-optimized: compact horizontal widget
      height: 300,
    },
    notion: {
      width: 6,    // 6 units wide in 12-column grid (50%)
      height: 3,   // 3:6 aspect ratio (1:2)
    },
    component: ClockComponent,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'A clean monthly calendar view',
    category: 'Time',
    icon: <Calendar className="w-full h-full" />,
    defaultSize: {
      width: 500,  // Notion-optimized: square-ish for calendar grid
      height: 550,
    },
    notion: {
      width: 5,    // 5 units in 12-column grid (~42%)
      height: 6,   // Near-square aspect ratio (5:6)
    },
    component: CalendarComponent,
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Simple weather display widget',
    category: 'Information',
    icon: <CloudSun className="w-full h-full" />,
    defaultSize: {
      width: 400,  // Notion-optimized: compact widget
      height: 350,
    },
    notion: {
      width: 4,    // 4 units in 12-column grid (~33%)
      height: 4,   // Slightly taller for weather details (4:4, 1:1 ratio)
    },
    component: WeatherComponent,
  },
  {
    id: 'year-progress',
    name: 'Year Progress',
    description: 'Track the progress of year, month, and day',
    category: 'Time',
    icon: <BarChart3 className="w-full h-full" />,
    defaultSize: {
      width: 700,  // Notion-optimized: wider for progress bars
      height: 350,
    },
    notion: {
      width: 7,    // 7 units in 12-column grid (~58%)
      height: 4,   // Horizontal layout (7:4 ratio)
    },
    component: YearProgressComponent,
  },
  {
    id: 'quote',
    name: 'Daily Quote',
    description: 'Inspirational quotes that change periodically',
    category: 'Motivation',
    icon: <Quote className="w-full h-full" />,
    defaultSize: {
      width: 800,  // Notion-optimized: wider for text readability
      height: 300,
    },
    notion: {
      width: 8,    // 8 units in 12-column grid (~67%)
      height: 3,   // Wide horizontal layout
    },
    component: QuoteComponent,
  },
  {
    id: 'countdown',
    name: 'Countdown Timer',
    description: 'Countdown to New Year 2025',
    category: 'Time',
    icon: <Hourglass className="w-full h-full" />,
    defaultSize: {
      width: 700,  // Notion-optimized: fits 4 time units
      height: 300,
    },
    notion: {
      width: 7,    // 7 units in 12-column grid (~58%)
      height: 3,   // Horizontal layout for timer units
    },
    component: CountdownComponent,
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus timer with work and break intervals',
    category: 'Productivity',
    icon: <Timer className="w-full h-full" />,
    defaultSize: {
      width: 400,
      height: 400,
    },
    notion: {
      width: 4,
      height: 4,
    },
    component: PomodoroComponent,
  },
];
