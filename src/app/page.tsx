'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bike, MapPin, Shield, Users, Zap, Bell, Heart, Star, Camera, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const stats = [
    { id: 1, name: 'Active Users', value: '250+', icon: Users },
    { id: 2, name: 'Bikes Reported', value: '150+', icon: Bike },
    { id: 3, name: 'Successful Reunions', value: '12', icon: Heart },
    { id: 4, name: 'Response Time', value: '<24h', icon: Zap },
  ];

  const features = [
    {
      name: 'AI-Powered Matching',
      description: 'Advanced computer vision instantly matches stolen and found bikes using image recognition technology.',
      icon: Camera,
    },
    {
      name: 'Instant Alerts',
      description: 'Get notified immediately when your bike is spotted in the community.',
      icon: Bell,
    },
    {
      name: 'Location Tracking',
      description: 'Real-time map showing reported bikes and sightings across Yellowknife.',
      icon: MapPin,
    },
    {
      name: 'Secure & Private',
      description: 'Your data is encrypted and protected. Only share what you want.',
      icon: Shield,
    },
  ];

  const testimonials = [
    {
      content: "I got my bike back within 48 hours! The AI matching was spot-on. This platform is incredible.",
      author: "Sarah M.",
      role: "Yellowknife Resident",
      rating: 5,
    },
    {
      content: "The community here is amazing. Found a bike and reunited it with its owner the same day!",
      author: "Mike T.",
      role: "Community Member",
      rating: 5,
    },
    {
      content: "Easy to use, fast notifications, and it actually works. Best bike recovery tool out there.",
      author: "Jessica L.",
      role: "Cycling Enthusiast",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10"></div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-20 w-full">
        <div className="w-full max-w-none mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-16 xl:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <Badge className="mb-6 bg-primary-100 text-primary-700 border-primary-200 px-5 py-2.5 text-base font-semibold inline-flex">
                  Now Live in Yellowknife
                </Badge>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-900 leading-tight">
                  Reunite with your{' '}
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                    stolen bike
                  </span>
                </h1>
                <p className="mt-8 text-xl lg:text-2xl text-gray-600 leading-relaxed">
                  Community-powered bike recovery using AI. Report stolen or found bikes, get instant matches, and help keep Yellowknife cycling safe.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 xl:gap-6">
                <Link href="/report/stolen">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-10 py-7 xl:px-12 xl:py-8 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white rounded-2xl text-lg xl:text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Report Stolen Bike
                  </Button>
                </Link>
                <Link href="/report/found">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-10 py-7 xl:px-12 xl:py-8 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-2xl text-lg xl:text-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 group hover:scale-105"
                  >
                    <span>Report Found Bike</span>
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 ring-4 ring-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">250+ users</p>
                  <p className="text-sm text-gray-600">Protecting bikes in Yellowknife</p>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="lg:col-span-2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl"></div>
              <Card className="relative p-8 bg-white/90 backdrop-blur-sm border-gray-200 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                        <Bike className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Recovery Rate</p>
                        <p className="text-3xl font-bold text-gray-900">8.5%</p>
                      </div>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 font-semibold">
                      Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <p className="text-sm text-gray-600 font-medium">Reports</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">150+</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <p className="text-sm text-gray-600 font-medium">Reunited</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Recent Activity</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-700">3 bikes reported today</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-700">2 matches found this week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative pb-20 w-full">
        <div className="w-full max-w-none mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <Card className="bg-white shadow-2xl border-gray-200 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-100">
              {stats.map((stat) => (
                <div key={stat.id} className="p-10 xl:p-12 text-center hover:bg-gradient-to-br hover:from-primary-50/50 hover:to-secondary-50/50 transition-all duration-300 group">
                  <div className="inline-flex p-5 xl:p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <stat.icon className="h-10 w-10 xl:h-12 xl:w-12 text-primary-600" />
                  </div>
                  <p className="text-4xl xl:text-5xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-base xl:text-lg font-semibold text-gray-600">{stat.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 w-full">
        <div className="w-full max-w-none mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-16 xl:p-20">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-700 border-primary-200 px-5 py-2.5 text-base font-semibold inline-flex">
              Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              Everything you need to recover your bike
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
              Powered by advanced AI and community collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-10 h-full hover:shadow-2xl transition-all duration-300 border-gray-200 group bg-white hover:border-primary-200">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="flex-shrink-0 p-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <feature.icon className="h-10 w-10 xl:h-12 xl:w-12 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">{feature.name}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 w-full">
        <div className="w-full max-w-none mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl shadow-2xl border border-primary-100 p-8 lg:p-16 xl:p-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              Get started in just a few minutes
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600">Simple, fast, and effective</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-16 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-28 left-0 right-0 h-2 bg-gradient-to-r from-primary-300 via-secondary-300 to-primary-300 rounded-full"></div>

            {[
              {
                step: '01',
                title: 'Report Your Bike',
                description: 'Upload photos and details of your stolen or found bike in just a few minutes.',
              },
              {
                step: '02',
                title: 'AI Matches',
                description: 'Our system automatically scans and matches bikes using advanced AI technology.',
              },
              {
                step: '03',
                title: 'Get Connected',
                description: 'Receive instant notifications and connect directly with community members.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-28 h-28 xl:w-32 xl:h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl shadow-2xl mb-8 relative z-10 group-hover:scale-110 transition-transform">
                  <span className="text-5xl xl:text-6xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 w-full">
        <div className="w-full max-w-none mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-16 xl:p-20">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary-100 text-primary-700 border-primary-200 px-5 py-2.5 text-base font-semibold inline-flex">
              Testimonials
            </Badge>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">What our community says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-10 xl:p-12 h-full hover:shadow-2xl transition-all duration-300 border-gray-200 bg-white hover:border-primary-200 hover:scale-105">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-8 text-lg xl:text-xl text-center">"{testimonial.content}"</p>
                  <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 shadow-lg"></div>
                    <div className="text-center">
                      <p className="font-bold text-lg text-gray-900">{testimonial.author}</p>
                      <p className="text-base text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 w-full">
        <div className="w-full max-w-none mx-auto px-4 lg:px-8 xl:px-16 2xl:px-24">
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 rounded-3xl shadow-2xl p-12 lg:p-16 xl:p-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">
              Ready to protect your bike?
            </h2>
            <p className="text-xl lg:text-2xl xl:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed">
              Join our community today and help make Yellowknife safer for cyclists
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 xl:gap-8 pt-4">
              <Link href="/report/stolen">
                <Button
                  size="lg"
                  className="px-12 py-7 xl:px-14 xl:py-8 bg-white text-primary-700 hover:bg-gray-50 rounded-2xl shadow-2xl text-xl xl:text-2xl font-bold hover:scale-105 transition-all"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/map">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-12 py-7 xl:px-14 xl:py-8 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-2xl text-xl xl:text-2xl font-bold hover:scale-105 transition-all"
                >
                  View Map
                </Button>
              </Link>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
