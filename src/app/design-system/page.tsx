'use client';

import { motion } from 'framer-motion';
import { Bike, MapPin, Shield, Sparkles, Heart, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function DesignSystemPage() {
  const primaryColors = [
    { name: '50', bg: '#f0f9f9', text: 'dark' },
    { name: '100', bg: '#d9f2f1', text: 'dark' },
    { name: '200', bg: '#b3e5e4', text: 'dark' },
    { name: '300', bg: '#8dd8d6', text: 'dark' },
    { name: '400', bg: '#5dc0bc', text: 'dark' },
    { name: '500', bg: '#2D5F5D', text: 'light' },
    { name: '600', bg: '#264f4d', text: 'light' },
    { name: '700', bg: '#1e3f3d', text: 'light' },
    { name: '800', bg: '#17302e', text: 'light' },
    { name: '900', bg: '#0f201f', text: 'light' },
  ];

  const secondaryColors = [
    { name: '50', bg: '#f0f9fb', text: 'dark' },
    { name: '100', bg: '#d9f0f5', text: 'dark' },
    { name: '200', bg: '#b3e1eb', text: 'dark' },
    { name: '300', bg: '#8dd2e1', text: 'dark' },
    { name: '400', bg: '#6ab0c4', text: 'dark' },
    { name: '500', bg: '#4A90A4', text: 'light' },
    { name: '600', bg: '#3b7383', text: 'light' },
    { name: '700', bg: '#2d5662', text: 'light' },
    { name: '800', bg: '#1e3941', text: 'light' },
    { name: '900', bg: '#0f1c21', text: 'light' },
  ];

  const accentColors = [
    { name: '50', bg: '#fef9ed', text: 'dark' },
    { name: '100', bg: '#fdf2d6', text: 'dark' },
    { name: '200', bg: '#fbe5ad', text: 'dark' },
    { name: '300', bg: '#f9d884', text: 'dark' },
    { name: '400', bg: '#f8c46f', text: 'dark' },
    { name: '500', bg: '#E8B44F', text: 'dark' },
    { name: '600', bg: '#ba903f', text: 'light' },
    { name: '700', bg: '#8b6c2f', text: 'light' },
    { name: '800', bg: '#5c4820', text: 'light' },
    { name: '900', bg: '#2e2410', text: 'light' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-snow-white via-frost-gray to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-frost-gray sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            YK Bike Finder - Design System
          </motion.h1>
          <p className="text-slate-gray-light mt-2">Beautiful Tailwind CSS utilities for crafting stunning UIs</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Color Palette */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Color Palette</h2>
            
            {/* Primary Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">Primary (NWT Teal)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {primaryColors.map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className="h-20 rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color.bg }}
                    />
                    <span className="text-sm font-mono">{color.name}</span>
                    <br />
                    <span className="text-xs text-slate-gray-light">{color.bg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">Secondary (Sky Blue)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {secondaryColors.map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className="h-20 rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color.bg }}
                    />
                    <span className="text-sm font-mono">{color.name}</span>
                    <br />
                    <span className="text-xs text-slate-gray-light">{color.bg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">Accent (Golden Yellow)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {accentColors.map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className="h-20 rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color.bg }}
                    />
                    <span className="text-sm font-mono">{color.name}</span>
                    <br />
                    <span className="text-xs text-slate-gray-light">{color.bg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Color Variants */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">Available Variants</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="h-20 bg-primary rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">primary</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-primary-light rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">primary-light</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-primary-dark rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">primary-dark</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-secondary rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">secondary</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-secondary-light rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">secondary-light</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-accent rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">accent</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-danger rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">danger</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-success rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">success</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-snow-white border-2 border-frost-gray rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">snow-white</span>
                </div>
                <div className="text-center">
                  <div className="h-20 bg-slate-gray rounded-lg shadow-md mb-2 hover:scale-105 transition-transform cursor-pointer" />
                  <span className="text-sm font-semibold">slate-gray</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Buttons */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Buttons</h2>
            <div className="space-y-6">
              {/* Variants */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="accent">Accent</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="glass">Glass</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                  <Button size="icon"><Bike className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-gray-light">With Icons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button><Bike className="mr-2 h-4 w-4" />Report Bike</Button>
                  <Button variant="secondary"><MapPin className="mr-2 h-4 w-4" />View Map</Button>
                  <Button variant="accent"><Sparkles className="mr-2 h-4 w-4" />Premium</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Cards */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>A basic card with default styling</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-gray-light">Perfect for general content</p>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>Card with enhanced shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-gray-light">Stands out from the page</p>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                  <CardDescription>Frosted glass effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-gray-light">Modern blur effect</p>
                </CardContent>
              </Card>

              <Card variant="gradient">
                <CardHeader>
                  <CardTitle className="text-white">Gradient Card</CardTitle>
                  <CardDescription className="text-white/80">Colorful gradient background</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">Eye-catching design</p>
                </CardContent>
              </Card>

              <Card variant="interactive" className="cursor-pointer">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover to see effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-gray-light">Click me!</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Badges */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Badges</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="ghost">Ghost</Badge>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge size="sm">Small</Badge>
                <Badge size="default">Default</Badge>
                <Badge size="lg">Large</Badge>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>
                <Badge variant="success"><Heart className="h-3 w-3 mr-1" />Favorite</Badge>
                <Badge variant="accent"><Zap className="h-3 w-3 mr-1" />Featured</Badge>
                <Badge variant="danger"><AlertCircle className="h-3 w-3 mr-1" />Alert</Badge>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Animations */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Animations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="animate-fade-in">
                <CardContent className="pt-6 text-center">
                  <Bike className="h-12 w-12 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Fade In</p>
                  <code className="text-xs">animate-fade-in</code>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up">
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-secondary" />
                  <p className="font-semibold">Fade In Up</p>
                  <code className="text-xs">animate-fade-in-up</code>
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardContent className="pt-6 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-2 text-accent" />
                  <p className="font-semibold">Scale In</p>
                  <code className="text-xs">animate-scale-in</code>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-2 text-primary animate-pulse-slow" />
                  <p className="font-semibold">Pulse Slow</p>
                  <code className="text-xs">animate-pulse-slow</code>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Zap className="h-12 w-12 mx-auto mb-2 text-accent animate-bounce-slow" />
                  <p className="font-semibold">Bounce Slow</p>
                  <code className="text-xs">animate-bounce-slow</code>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-2 text-danger animate-float" />
                  <p className="font-semibold">Float</p>
                  <code className="text-xs">animate-float</code>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Shadows & Effects */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Shadows & Effects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Shadow SM</h3>
                <code className="text-xs">shadow-sm</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold mb-2">Shadow MD</h3>
                <code className="text-xs">shadow-md</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold mb-2">Shadow LG</h3>
                <code className="text-xs">shadow-lg</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="font-semibold mb-2">Shadow XL</h3>
                <code className="text-xs">shadow-xl</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-2xl">
                <h3 className="font-semibold mb-2">Shadow 2XL</h3>
                <code className="text-xs">shadow-2xl</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-glow">
                <h3 className="font-semibold mb-2">Shadow Glow</h3>
                <code className="text-xs">shadow-glow</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-primary">
                <h3 className="font-semibold mb-2 text-primary">Primary Shadow</h3>
                <code className="text-xs">shadow-primary</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-secondary">
                <h3 className="font-semibold mb-2 text-secondary">Secondary Shadow</h3>
                <code className="text-xs">shadow-secondary</code>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-accent">
                <h3 className="font-semibold mb-2 text-accent">Accent Shadow</h3>
                <code className="text-xs">shadow-accent</code>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Gradients */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-slate-gray mb-6">Gradients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                <div className="text-white text-center">
                  <p className="font-semibold">Primary to Secondary</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">from-primary to-secondary</code>
                </div>
              </div>
              <div className="h-32 rounded-xl bg-gradient-to-br from-accent-light via-accent to-accent-dark flex items-center justify-center shadow-lg">
                <div className="text-white text-center">
                  <p className="font-semibold">Accent Gradient</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">from-accent-light to-accent-dark</code>
                </div>
              </div>
              <div className="h-32 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                <div className="text-white text-center">
                  <p className="font-semibold">Multi-color</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">from-primary via-secondary to-accent</code>
                </div>
              </div>
              <div className="h-32 rounded-xl bg-gradient-to-br from-success to-primary flex items-center justify-center shadow-lg">
                <div className="text-white text-center">
                  <p className="font-semibold">Success to Primary</p>
                  <code className="text-xs bg-black/20 px-2 py-1 rounded">from-success to-primary</code>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Glass Morphism */}
        <section className="relative h-96 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />
          <div className="absolute inset-0 backdrop-blur-3xl opacity-50" />
          
          <motion.div
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card variant="glass" className="max-w-md">
              <CardHeader>
                <CardTitle className="text-white">Glass Morphism</CardTitle>
                <CardDescription className="text-white/80">Beautiful frosted glass effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/90 mb-4">
                  Combine backdrop-blur with semi-transparent backgrounds for stunning glass effects.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-white/30 text-white bg-white/10">Modern</Badge>
                  <Badge variant="outline" className="border-white/30 text-white bg-white/10">Beautiful</Badge>
                  <Badge variant="outline" className="border-white/30 text-white bg-white/10">Trendy</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
