import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Briefcase, Users, MessageSquare, Star, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <MainLayout showSidebar={false}>
      {/* Hero Section */}
      <div className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Connect Talent with
          <span className="text-primary"> Opportunities</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Micro-Match Marketplace connects students, labs, and startups with skilled contributors 
          for short and long-term projects. Find your next collaboration today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">Browse Projects</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Micro-Match?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to find the right talent for your projects and showcase your skills to potential clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Briefcase className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Diverse Projects</CardTitle>
              <CardDescription>
                From short-term tasks to long-term collaborations, find projects that match your skills and interests.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Skilled Contributors</CardTitle>
              <CardDescription>
                Connect with verified contributors who have the expertise you need for your projects.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Seamless Communication</CardTitle>
              <CardDescription>
                Built-in messaging and milestone tracking keep your projects organized and on track.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Choose your role and begin collaborating in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Clients */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">For Clients</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Post Your Project</h4>
                  <p className="text-gray-600">Describe your project, set budget and timeline, specify required skills.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Review Bids</h4>
                  <p className="text-gray-600">Compare proposals from qualified contributors and choose the best fit.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Collaborate & Deliver</h4>
                  <p className="text-gray-600">Work together through milestones and deliver exceptional results.</p>
                </div>
              </div>
            </div>
          </div>

          {/* For Contributors */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">For Contributors</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Browse Projects</h4>
                  <p className="text-gray-600">Find projects that match your skills and interests.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Submit Your Bid</h4>
                  <p className="text-gray-600">Propose your approach, timeline, and pricing for the project.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Deliver Excellence</h4>
                  <p className="text-gray-600">Complete milestones and build your reputation with quality work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600">Active Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
            <div className="text-gray-600">Contributors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">300+</div>
            <div className="text-gray-600">Clients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary rounded-lg text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of contributors and clients who are already collaborating on Micro-Match.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
            <Link href="/projects">Browse Projects</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
