import { notFound } from 'next/navigation';
import { widgets } from '@/lib/widgets';
import WidgetDisplay from './WidgetDisplay';

export function generateStaticParams() {
  return widgets.map((widget) => ({
    id: widget.id,
  }));
}

interface WidgetPageProps {
  params: Promise<{ id: string }>;
}

export default async function WidgetPage({ params }: WidgetPageProps) {
  const resolvedParams = await params;
  
  const widget = widgets.find(w => w.id === resolvedParams.id);
  if (!widget) {
    notFound();
  }
  
  return <WidgetDisplay widgetId={resolvedParams.id} />;
}