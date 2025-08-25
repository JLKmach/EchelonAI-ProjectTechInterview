import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Heart, Video, Users, Shield, Play } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      name: 'Video Profiles',
      description: 'Show your true self through 3-minute video profiles that capture your passions and personality.',
      icon: Video,
    },
    {
      name: 'Smart Matching',
      description: 'Our AI-powered algorithm finds compatible matches based on interests, location, and values.',
      icon: Heart,
    },
    {
      name: 'Real Connections',
      description: 'Build meaningful relationships through video calls and in-person meetings.',
      icon: Users,
    },
    {
      name: 'Safe & Verified',
      description: 'Multi-layer verification system ensures genuine profiles and safe interactions.',
      icon: Shield,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-purple-600/10 px-3 py-1 text-sm font-semibold leading-6 text-purple-600 ring-1 ring-inset ring-purple-600/10">
                  What&apos;s new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just launched</span>
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connect through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                video stories
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl">
              Conecta con personas reales a través de videos auténticos. 
              Muestra tu personalidad, pasiones e intereses de una manera 
              que las fotos simplemente no pueden capturar.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              {isAuthenticated ? (
                <Link
                  to="/app/profile"
                  className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Go to Profile
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    Get started
                  </Link>
                  <Link
                    to="/login"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Sign in <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="aspect-[2/1] w-[24rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 sm:w-[32rem] lg:w-[40rem]">
                  <div className="h-full w-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-md flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg font-semibold">Your Video Profile</p>
                      <p className="text-sm opacity-90">3 minutes to show who you are</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Why VideoMatch?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to find meaningful connections
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            VideoMatch combines the power of video storytelling with intelligent matching to help you 
            find people who truly resonate with your interests and values.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-purple-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to find your perfect match?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-lg leading-8 text-gray-600">
            Join thousands of people who are already using VideoMatch to build meaningful connections.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            {!isAuthenticated && (
              <Link
                to="/register"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Get started for free
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
