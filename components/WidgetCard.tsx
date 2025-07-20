'use client';

import React, { useState } from 'react';
import { Widget, Theme } from '@/types/theme';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check, Settings } from 'lucide-react';

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
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Widget Preview */}
      <div className="relative h-40 bg-muted overflow-hidden">
        {/* Animated gradient background on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Scale the widget to fit */}
        <div className="absolute inset-0 flex items-center justify-center scale-50">
          <div className="w-[200%] h-[200%] flex items-center justify-center">
            <WidgetComponent theme={theme} />
          </div>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm">
            {widget.category}
          </span>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <span className="text-xl">{widget.icon}</span>
            {widget.name}
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          {widget.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="p-4 pt-2 gap-2">
        <Button
          onClick={handleCopy}
          size="sm"
          className="flex-1"
          variant={copied ? "default" : "outline"}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy URL
            </>
          )}
        </Button>
        {onCustomize && (
          <Button
            onClick={handleCustomize}
            size="sm"
            variant="ghost"
            className="px-2"
          >
            <Settings className="h-3 w-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}