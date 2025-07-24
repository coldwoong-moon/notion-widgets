'use client';

import React, { useState } from 'react';
import { Widget, Theme } from '@/types/theme';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  widget: Widget;
  theme: Theme;
  baseUrl: string;
  onCustomize?: (widget: Widget) => void;
}

export function WidgetCard({ widget, theme, baseUrl, onCustomize }: WidgetCardProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const widgetUrl = `${baseUrl}/widget/${widget.id}?theme=${theme.id}`;
  const WidgetComponent = widget.component;
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(widgetUrl);
      setCopied(true);
      toast.success('Widget URL copied!', {
        description: 'Paste it in Notion using /embed',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy URL');
    }
  };

  const handleCustomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCustomize) {
      onCustomize(widget);
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Preview - 실제 위젯이 잘 보이도록 */}
      <div
        className="relative bg-white dark:bg-slate-950 overflow-hidden border-b"
        style={{ aspectRatio: `${widget.notion.width} / ${widget.notion.height}` }}
      >
        {/* Animated gradient background on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Scale the widget to fit - 더 크게 표시 */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="transform scale-75 origin-center">
            <WidgetComponent theme={theme} notion={widget.notion} />
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary">
            {widget.category}
          </span>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="text-xl">{widget.icon}</span>
          {widget.name}
        </CardTitle>
        <CardDescription className="text-xs mt-1 line-clamp-2">
          {widget.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="p-4 pt-0 gap-2">
        {onCustomize && (
          <Button
            onClick={handleCustomize}
            size="sm"
            variant="ghost"
            className="p-2"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
        <Button
          onClick={handleCopy}
          size="sm"
          className={cn(
            "flex-1 font-medium transition-all",
            copied && "bg-green-600 hover:bg-green-700 text-white"
          )}
          variant="default"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy URL
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}