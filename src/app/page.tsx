'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bike, MapPin, Shield, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-gray sm:text-6xl">
              Reuniting Bikes in{' '}
              <span className="text-primary">Yellowknife</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-gray/80 sm:text-xl">
              Help your Yellowknife community by reporting stolen bikes and found bikes. 
              Our smart matching system connects bike owners with their recovered bicycles 
              in the Yellowknife area.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/report/stolen">
                <Button size="lg" className="w-full sm:w-auto">
                  Report Stolen Bike
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/report/found">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Report Found Bike
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Bike className="h-16 w-16 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <MapPin className="h-20 w-20 text-secondary" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-gray sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-gray/80">
              Simple steps to help your community recover stolen bikes
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Report Your Bike</CardTitle>
                <CardDescription>
                  Upload photos and details of your stolen bike or a bike you found
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>
                  Our AI compares photos and features to find potential matches
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Connect & Chat</CardTitle>
                <CardDescription>
                  Get connected with potential matches through secure messaging
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-frost-gray/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-gray sm:text-4xl">
                Serving All NWT Communities
              </h2>
              <p className="mt-4 text-lg text-slate-gray/80">
                From Yellowknife to Tuktoyaktuk, we're connecting cyclists across the territory
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-slate-gray/80">Communities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">100%</div>
                <div className="text-sm text-slate-gray/80">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-slate-gray/80">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">Soft Launch</div>
                <div className="text-sm text-slate-gray/80">Yellowknife Area</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Help Your Community?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join cyclists across the Northwest Territories in keeping our communities safe
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/map">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  View Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-gray text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Bike className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">YK Bike Finder</span>
              </div>
              <p className="text-white/80 text-sm">
                Connecting cyclists in Yellowknife to recover stolen bikes and help the community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/map" className="text-white/80 hover:text-white">Map View</Link></li>
                <li><Link href="/report/stolen" className="text-white/80 hover:text-white">Report Stolen</Link></li>
                <li><Link href="/report/found" className="text-white/80 hover:text-white">Report Found</Link></li>
                <li><Link href="/auth/login" className="text-white/80 hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="text-white/80 hover:text-white">Help Center</Link></li>
                <li><Link href="/privacy" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-white/80 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Communities</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Yellowknife</li>
                <li>Dettah</li>
                <li>N'Dilo</li>
                <li className="text-white/60">More coming soon...</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
            <p>&copy; 2024 YK Bike Finder. Built for the Yellowknife community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}