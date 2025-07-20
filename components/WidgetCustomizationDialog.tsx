'use client';

import React from 'react';
import { Widget, Theme } from '@/types/theme';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

interface WidgetCustomizationDialogProps {
  widget: Widget | null;
  theme: Theme;
  baseUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WidgetCustomizationDialog({
  widget,
  theme,
  baseUrl,
  open,
  onOpenChange,
}: WidgetCustomizationDialogProps) {
  const [copied, setCopied] = React.useState(false);
  const [customParams] = React.useState<Record<string, string>>({});

  if (!widget) return null;

  const WidgetComponent = widget.component;
  
  // Build URL with custom parameters
  const buildUrl = () => {
    const params = new URLSearchParams({
      theme: theme.id,
      ...customParams,
    });
    return `${baseUrl}/widget/${widget.id}?${params.toString()}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildUrl());
      setCopied(true);
      toast.success('Custom widget URL copied!', {
        description: 'Paste it in Notion using /embed',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy URL');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{widget.icon}</span>
            Customize {widget.name}
          </DialogTitle>
          <DialogDescription>
            Preview and customize your widget before copying the URL
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Widget Preview */}
          <div className="rounded-lg border bg-muted p-8">
            <div className="mx-auto" style={{ maxWidth: '400px' }}>
              <WidgetComponent theme={theme} />
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Customization Options</h3>
            <p className="text-sm text-muted-foreground">
              More customization options coming soon! For now, you can choose different themes using the theme selector in the header.
            </p>
          </div>

          {/* URL Preview */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Widget URL</h3>
            <div className="flex gap-2">
              <code className="flex-1 rounded-md bg-muted px-3 py-2 text-xs font-mono overflow-x-auto">
                {buildUrl()}
              </code>
              <Button
                onClick={handleCopy}
                size="sm"
                variant={copied ? "default" : "outline"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}