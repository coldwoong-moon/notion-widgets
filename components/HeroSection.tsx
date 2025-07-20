'use client';

import React from 'react';

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full gradient-primary opacity-20 animate-float" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full gradient-secondary opacity-20 animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full gradient-success opacity-10 animate-pulse-slow" />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Beautiful Widgets</span>
              <br />
              <span className="text-gray-900 dark:text-white">for Your Notion</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Enhance your Notion workspace with our collection of minimalist, 
              customizable widgets. Perfect for dashboards, personal pages, and more.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Explore Widgets
                <span className="ml-2">→</span>
              </button>
              
              <a
                href="#how-to-use"
                className="px-6 py-3 rounded-xl font-medium glass glass-hover text-gray-900 dark:text-white focus-ring"
              >
                How to Use
              </a>
            </div>
            
            {/* Features */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="w-12 h-12 rounded-lg gradient-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Easy to Use
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Simply copy the widget URL and paste it into Notion using /embed
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="w-12 h-12 rounded-lg gradient-secondary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Customizable
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Multiple themes to match your Notion aesthetic perfectly
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="w-12 h-12 rounded-lg gradient-success mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Always Free
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Open source and free forever. No ads, no tracking, just widgets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}