'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bike, MapPin, Shield, Users, Zap, ArrowRight, CheckCircle, Search, MessageSquare, Bell, Heart, Star, Sparkles, Camera, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Tailwind UI Style */}
      <section className="relative isolate overflow-hidden bg-white">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-500 to-accent-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold leading-6 text-primary-700 ring-1 ring-inset ring-primary-700/10">
                  <span>Now live in Yellowknife</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Reunite with your stolen bike
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Community-powered bike recovery using AI. Report stolen or found bikes, get instant matches, and help keep Yellowknife cycling safe.
              </p>
              
              <div className="mt-10 flex items-center gap-x-4">
                <Link href="/report/stolen">
                  <Button size="lg" className="shadow-sm">
                    Report stolen bike
                  </Button>
                </Link>
                <Link href="/map">
                  <Button variant="outline" size="lg">
                    View map <MapPin className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gray-200 ring-2 ring-white" />
                  ))}
                </div>
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">250+ active users</p>
                  <p className="text-gray-600">helping recover bikes</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Image/Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <Card className="p-8 shadow-2xl ring-1 ring-gray-900/10">
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-primary-50 p-4">
                      <div className="text-3xl font-bold text-primary-600">12</div>
                      <div className="text-sm text-gray-600">Bikes reunited</div>
                    </div>
                    <div className="rounded-lg bg-secondary-50 p-4">
                      <div className="text-3xl font-bold text-secondary-600">150+</div>
                      <div className="text-sm text-gray-600">Reports filed</div>
                    </div>
                  </div>
                  
                  {/* Feature highlights */}
                  <div className="space-y-3">
                    {[
                      { icon: Camera, text: 'AI-powered image matching' },
                      { icon: Bell, text: 'Instant notifications' },
                      { icon: Lock, text: 'Secure & private' },
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                          <feature.icon className="h-4 w-4 text-gray-600" />
                        </div>
                        {feature.text}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary-400 to-primary-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>
      </section>

      {/* Logo Cloud / Stats Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-base font-semibold leading-7 text-primary-600">Trusted by the community</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Making Yellowknife safer, one bike at a time
              </p>
            </motion.div>
            
            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={container}
              className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { name: 'Active Users', value: '250+', icon: Users },
                { name: 'Bikes Reported', value: '150+', icon: Bike },
                { name: 'Successful Reunions', value: '12', icon: Heart },
                { name: 'Response Time', value: '<24h', icon: Zap },
              ].map((stat, i) => (
                <motion.div key={stat.name} variants={item} className="flex flex-col bg-gray-50 p-8 hover:bg-gray-100 transition-colors">
                  <dt className="text-sm font-semibold leading-6 text-gray-600 flex items-center justify-center gap-2">
                    <stat.icon className="h-4 w-4" />
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">{stat.value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powerful features for bike recovery
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform combines cutting-edge AI with community collaboration to help you recover your stolen bike.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Large Feature Card */}
            <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <Card className="h-full p-8 border-2 border-primary-100 hover:border-primary-200 transition-colors">
                <div className="flex h-full flex-col">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
                    <Camera className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">AI-Powered Matching</h3>
                  <p className="mt-2 flex-1 text-gray-600 leading-relaxed">
                    Advanced computer vision analyzes bike photos to find visual matches automatically, even if parts have been changed.
                  </p>
                  <Link href="/about" className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Learn more <ArrowRight className="inline h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Medium Feature Cards */}
            <motion.div variants={item}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <Bell className="h-10 w-10 text-secondary-600" />
                <h3 className="mt-4 font-semibold text-gray-900">Instant Alerts</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Get notified immediately when a potential match is found
                </p>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <MapPin className="h-10 w-10 text-accent-600" />
                <h3 className="mt-4 font-semibold text-gray-900">Location Tracking</h3>
                <p className="mt-2 text-sm text-gray-600">
                  See exactly where bikes were lost or found on our interactive map
                </p>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <Shield className="h-10 w-10 text-success-600" />
                <h3 className="mt-4 font-semibold text-gray-900">Secure & Private</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Your personal information is protected with enterprise security
                </p>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                <MessageSquare className="h-10 w-10 text-primary-600" />
                <h3 className="mt-4 font-semibold text-gray-900">Direct Messaging</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Connect directly with bike owners or finders through our secure chat
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">How It Works</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Three simple steps
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {[
              {
                step: '01',
                title: 'Report Your Bike',
                description: 'Upload photos and details of your stolen bike or a bike you found. Takes less than 2 minutes.',
                icon: Bike,
              },
              {
                step: '02',
                title: 'AI Finds Matches',
                description: 'Our AI analyzes thousands of bikes to find potential matches based on visual features and details.',
                icon: Zap,
              },
              {
                step: '03',
                title: 'Connect & Reunite',
                description: 'Get notified of matches and connect directly with bike owners or finders to arrange pickup.',
                icon: Heart,
              },
            ].map((step, index) => (
              <motion.div key={index} variants={item} className="relative">
                <Card className="h-full p-8 hover:shadow-lg transition-shadow">
                  <div className="text-xs font-bold text-primary-600 tracking-widest">{step.step}</div>
                  <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
                    <step.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{step.description}</p>
                </Card>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto max-w-xl text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by cyclists in Yellowknife
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
          >
            {[
              {
                body: "I couldn't believe it when I got the notification. My bike was found within 48 hours! The AI matching really works.",
                author: {
                  name: 'Sarah M.',
                  handle: 'Yellowknifer',
                },
                rating: 5,
              },
              {
                body: 'The community aspect is amazing. Everyone is looking out for each other. Found a bike and reunited it with the owner in just 2 days.',
                author: {
                  name: 'Mike T.',
                  handle: 'Old Town',
                },
                rating: 5,
              },
              {
                body: 'Super easy to use and the map feature is brilliant. You can see all reported bikes in your area. Highly recommend!',
                author: {
                  name: 'Jessica L.',
                  handle: 'Frame Lake',
                },
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <p className="text-gray-900 leading-relaxed">{testimonial.body}</p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200" />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.author.handle}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
            {[
              {
                icon: Bike,
                title: 'Report Your Bike',
                description: 'Upload photos and details of your stolen bike or a bike you found in just a few minutes',
                color: '#2D5F5D',
                bgColor: 'bg-primary-50',
              },
              {
                icon: Zap,
                title: 'AI-Powered Matching',
                description: 'Our advanced AI compares visual features and bike details to find potential matches automatically',
                color: '#4A90A4',
                bgColor: 'bg-secondary-50',
              },
              {
                icon: MessageSquare,
                title: 'Connect & Reunite',
                description: 'Get notified of matches and chat securely with bike owners or finders to arrange reunions',
                color: '#E8B44F',
                bgColor: 'bg-accent-50',
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card variant="interactive" className="h-full border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} mb-4`}>
                      <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="mx-auto max-w-6xl"
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Built for the Community
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  icon: MapPin,
                  title: 'Interactive Map',
                  description: 'View all reported bikes on an interactive map of Yellowknife',
                  badge: 'Location-based',
                  color: 'text-primary-600',
                  bg: 'bg-primary-100',
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Your data is protected with enterprise-grade security',
                  badge: 'Protected',
                  color: 'text-secondary-600',
                  bg: 'bg-secondary-100',
                },
                {
                  icon: Bell,
                  title: 'Instant Notifications',
                  description: 'Get alerted immediately when your bike might be found',
                  badge: 'Real-time',
                  color: 'text-accent-600',
                  bg: 'bg-accent-100',
                },
                {
                  icon: Heart,
                  title: 'Community Driven',
                  description: 'Help your neighbors and build a safer cycling community',
                  badge: 'Together',
                  color: 'text-success-600',
                  bg: 'bg-success-100',
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="p-6 h-full border-gray-200 hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${feature.bg}`}>
                        <feature.icon className={`h-5 w-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                          <Badge variant="ghost" size="sm" className="text-xs">{feature.badge}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        {/* Professional Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Ready to Help Your Community?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed">
              Join hundreds of cyclists across Yellowknife in keeping our community safe and bikes on the road
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-gray-50 shadow-lg hover:shadow-xl group">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/map">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 shadow-lg"
                >
                  <MapPin className="h-5 w-5" />
                  Explore Map
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white" />
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white" />
                <span className="text-sm font-medium">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-white" />
                <span className="text-sm font-medium">Community Driven</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700">
                  <Bike className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">YK Bike Finder</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting cyclists in Yellowknife to recover stolen bikes and strengthen our community.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/map" className="text-gray-400 hover:text-white transition-colors">Map View</Link></li>
                <li><Link href="/report/stolen" className="text-gray-400 hover:text-white transition-colors">Report Stolen</Link></li>
                <li><Link href="/report/found" className="text-gray-400 hover:text-white transition-colors">Report Found</Link></li>
                <li><Link href="/bikes" className="text-gray-400 hover:text-white transition-colors">Browse Bikes</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} YK Bike Finder. Built with ❤️ in Yellowknife.
              </p>
              <Badge variant="accent" className="shadow-sm">
                🚀 Soft Launch – Yellowknife Area
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}