'use client';

import React, { useState, useEffect } from 'react';
import { Widget, Theme } from '@/types/theme';
import { Locale } from '@/lib/i18n';
import { t, TranslationKey } from '@/translations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface WidgetCustomizationDialogProps {
  widget: Widget | null;
  theme: Theme;
  baseUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: Locale;
}

export function WidgetCustomizationDialog({
  widget,
  theme,
  baseUrl,
  open,
  onOpenChange,
  locale = 'en',
}: WidgetCustomizationDialogProps) {
  const [copied, setCopied] = useState(false);
  const [customParams] = useState<Record<string, string>>({});

  // Default width percentage (relative to container)
  const [widthPercent, setWidthPercent] = useState(100);

  // Reset width when widget changes or dialog opens
  useEffect(() => {
    if (open) {
      setWidthPercent(100);
    }
  }, [open, widget]);

  if (!widget) return null;

  const WidgetComponent = widget.component;
  
  // Build URL with custom parameters
  const buildUrl = () => {
    const params = new URLSearchParams({
      theme: theme.id,
      ...customParams,
    });
    // Ensure locale is passed to widget URL
    if (locale) {
      params.append('lang', locale);
    }
    return `${baseUrl}/widget/${widget.id}?${params.toString()}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildUrl());
      setCopied(true);
      toast.success(t('gallery.urlCopied', locale), {
        description: t('gallery.embedInNotion', locale),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy URL');
    }
  };

  const handleReset = () => {
    setWidthPercent(100);
  };

  // Calculate actual pixel width for display
  const containerMaxWidth = 800; // Max width in the dialog
  const currentPixelWidth = Math.round((containerMaxWidth * widthPercent) / 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {/* Ensure icon is sized correctly */}
              <div className="w-5 h-5">
                {widget.icon}
              </div>
            </div>
            {t(`widget.${widget.id}` as TranslationKey, locale)}
          </DialogTitle>
          <DialogDescription>
            {t('gallery.preview', locale)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-8 py-4">
          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('customization.previewWidth', locale)}
                </label>
                <p className="text-xs text-muted-foreground">
                  {widthPercent}% ({currentPixelWidth}px)
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="h-8 text-xs"
                disabled={widthPercent === 100}
              >
                <RotateCcw className="mr-2 h-3.5 w-3.5" />
                {t('customization.reset', locale)}
              </Button>
            </div>

            <div className="relative pt-2">
              <input
                type="range"
                min="30"
                max="100"
                value={widthPercent}
                onChange={(e) => setWidthPercent(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.colors.primary} 0%, ${theme.colors.primary} ${widthPercent}%, #e2e8f0 ${widthPercent}%, #e2e8f0 100%)`
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{t('customization.size.small', locale)}</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{t('customization.size.medium', locale)}</span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{t('customization.size.large', locale)}</span>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="rounded-xl border bg-muted/10 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{
                   backgroundImage: `radial-gradient(${theme.colors.foreground} 1px, transparent 1px)`,
                   backgroundSize: '20px 20px'
                 }}
            />

            <div className="p-8 min-h-[400px] flex items-center justify-center relative overflow-x-auto">
              <div
                className="transition-all duration-300 ease-out shadow-xl rounded-sm ring-1 ring-black/5"
                style={{
                  width: `${widthPercent}%`,
                  minWidth: '300px', // Prevent it from getting too small to see
                  maxWidth: '100%',
                  backgroundColor: theme.colors.background, // Ensure widget has background
                  display: 'flex',
                }}
              >
                 <WidgetComponent theme={theme} notion={widget.notion} />
              </div>
            </div>
          </div>

          {/* Footer / URL Copy */}
          <div className="flex flex-col gap-3 pt-6 border-t bg-background sticky bottom-0 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{t('gallery.copyUrl', locale)}</h3>
              {copied && (
                <span className="text-xs text-green-600 font-medium animate-fade-in flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {t('gallery.urlCopied', locale)}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground text-xs">🔗</span>
                </div>
                <code className="block w-full rounded-md border bg-muted/50 pl-9 pr-3 py-2.5 text-xs font-mono text-foreground overflow-x-auto whitespace-nowrap scrollbar-hide focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {buildUrl()}
                </code>
              </div>
              <Button
                onClick={handleCopy}
                className={copied ? "bg-green-600 hover:bg-green-700 min-w-[100px]" : "min-w-[100px]"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
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
