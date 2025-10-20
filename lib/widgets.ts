import { Widget } from '@/types/theme';
import { Clock } from '@/components/widgets/Clock';
import { Calendar } from '@/components/widgets/Calendar';
import { Weather } from '@/components/widgets/Weather';
import { YearProgress } from '@/components/widgets/YearProgress';
import { Quote } from '@/components/widgets/Quote';
import { Countdown } from '@/components/widgets/Countdown';

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
    icon: '🕐',
    defaultSize: {
      width: 600,  // Notion-optimized: compact horizontal widget
      height: 300,
    },
    notion: {
      width: 6,    // 6 units wide in 12-column grid (50%)
      height: 3,   // 3:6 aspect ratio (1:2)
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
      width: 500,  // Notion-optimized: square-ish for calendar grid
      height: 550,
    },
    notion: {
      width: 5,    // 5 units in 12-column grid (~42%)
      height: 5.5, // Near-square aspect ratio
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
      width: 400,  // Notion-optimized: compact widget
      height: 350,
    },
    notion: {
      width: 4,    // 4 units in 12-column grid (~33%)
      height: 3.5, // Slightly taller for weather details
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
      width: 700,  // Notion-optimized: wider for progress bars
      height: 350,
    },
    notion: {
      width: 7,    // 7 units in 12-column grid (~58%)
      height: 3.5, // Horizontal layout
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
      width: 800,  // Notion-optimized: wider for text readability
      height: 300,
    },
    notion: {
      width: 8,    // 8 units in 12-column grid (~67%)
      height: 3,   // Wide horizontal layout
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
      width: 700,  // Notion-optimized: fits 4 time units
      height: 300,
    },
    notion: {
      width: 7,    // 7 units in 12-column grid (~58%)
      height: 3,   // Horizontal layout for timer units
    },
    component: Countdown,
  },
];