import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, CheckCircle } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  feature: string;
  completed: boolean;
}

export const UserTourGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: '1',
      title: 'Welcome to Group Administration',
      description: 'Your comprehensive platform for managing groups, members, and community engagement.',
      feature: 'Dashboard Overview',
      completed: false
    },
    {
      id: '2',
      title: 'Group Setup & Management',
      description: 'Configure your group settings, rules, and visual identity.',
      feature: 'Group Setup',
      completed: false
    },
    {
      id: '3',
      title: 'Member Management',
      description: 'Approve members, manage roles, and track member activity.',
      feature: 'Membership Management',
      completed: false
    },
    {
      id: '4',
      title: 'Performance Tracking',
      description: 'Monitor group engagement, attendance, and contribution metrics.',
      feature: 'Performance Analytics',
      completed: false
    },
    {
      id: '5',
      title: 'Content Oversight',
      description: 'Review and moderate group content to maintain community standards.',
      feature: 'Content Moderation',
      completed: false
    },
    {
      id: '6',
      title: 'Financial Management',
      description: 'Manage group wallet, transactions, and member contributions.',
      feature: 'Wallet Management',
      completed: false
    },
    {
      id: '7',
      title: 'Events & Communication',
      description: 'Create events, send notifications, and manage group communications.',
      feature: 'Event Management',
      completed: false
    }
  ];

  const [steps, setSteps] = useState(tourSteps);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const updatedSteps = steps.map((step, index) => 
      index <= currentStep ? { ...step, completed: true } : step
    );
    setSteps(updatedSteps);
    
    if (currentStep === steps.length - 1) {
      setShowTour(false);
    } else {
      handleNext();
    }
  };

  const startTour = () => {
    setShowTour(true);
    setCurrentStep(0);
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Group Admin Tour Guide</h1>
        <p className="text-gray-600">Get familiar with group administration features and capabilities</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Tour Progress</h2>
          <span className="text-sm text-gray-500">{completedSteps} of {steps.length} completed</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                step.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-blue-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                  <p className="text-xs text-gray-500">{step.feature}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={startTour}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
          >
            <Play className="w-4 h-4" />
            <span>{completedSteps === 0 ? 'Start Tour' : 'Continue Tour'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Tour Modal */}
      {showTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Step {currentStep + 1} of {steps.length}
              </h3>
              <button
                onClick={() => setShowTour(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h4>
              <p className="text-gray-600 mb-4">
                {steps[currentStep].description}
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Feature:</strong> {steps[currentStep].feature}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleComplete}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Highlights */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Group Administration</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Set up and configure your group</li>
            <li>• Manage member approvals and roles</li>
            <li>• Track performance and engagement</li>
            <li>• Moderate content and discussions</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Management</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Manage group wallet and funds</li>
            <li>• Process member contributions</li>
            <li>• Handle marketplace transactions</li>
            <li>• Distribute benefits and rewards</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication & Events</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Create and manage events</li>
            <li>• Send group notifications</li>
            <li>• Moderate chat discussions</li>
            <li>• Handle member feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};