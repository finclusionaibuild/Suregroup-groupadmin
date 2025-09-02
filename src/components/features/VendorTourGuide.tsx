import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, CheckCircle, Package, ShoppingCart, DollarSign, Star, MessageSquare, TrendingUp } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  feature: string;
  completed: boolean;
  icon: React.ComponentType<any>;
}

export const VendorTourGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: '1',
      title: 'Welcome to Vendor Portal',
      description: 'Your comprehensive platform for managing services, orders, and customer relationships in the SureGroups ecosystem.',
      feature: 'Dashboard Overview',
      completed: false,
      icon: Package
    },
    {
      id: '2',
      title: 'Service Management',
      description: 'Create and manage your service offerings. Connect services to specific groups and set pricing.',
      feature: 'My Services',
      completed: false,
      icon: Package
    },
    {
      id: '3',
      title: 'Order Processing',
      description: 'Accept orders, track delivery progress, and manage customer communications.',
      feature: 'Orders & Delivery',
      completed: false,
      icon: ShoppingCart
    },
    {
      id: '4',
      title: 'Financial Management',
      description: 'Track payments, manage escrow transactions, and monitor your earnings through SureBanker.',
      feature: 'SureBanker Integration',
      completed: false,
      icon: DollarSign
    },
    {
      id: '5',
      title: 'Customer Reviews',
      description: 'Build your reputation by managing customer reviews and maintaining high service quality.',
      feature: 'Ratings & Reviews',
      completed: false,
      icon: Star
    },
    {
      id: '6',
      title: 'Marketing & Promotion',
      description: 'Promote your services within groups, create special offers, and boost your visibility.',
      feature: 'Marketing Tools',
      completed: false,
      icon: TrendingUp
    },
    {
      id: '7',
      title: 'Support & Communication',
      description: 'Handle customer support, resolve disputes, and maintain professional communication.',
      feature: 'Support Center',
      completed: false,
      icon: MessageSquare
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Vendor Tour Guide</h1>
        <p className="text-gray-600">Get familiar with vendor features and service management capabilities</p>
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
                    <step.icon className="w-4 h-4" />
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
            <span>{completedSteps === 0 ? 'Start Vendor Tour' : 'Continue Tour'}</span>
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-blue-600" })}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {steps[currentStep].title}
              </h4>
              <p className="text-gray-600 mb-4 text-center">
                {steps[currentStep].description}
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800 text-center">
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
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Management</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Create and manage service offerings</li>
            <li>• Connect services to specific groups</li>
            <li>• Set pricing and availability</li>
            <li>• Track service performance</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Management</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Secure escrow payment processing</li>
            <li>• Automatic settlement confirmations</li>
            <li>• Transaction history and reporting</li>
            <li>• Revenue tracking and analytics</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Reputation Building</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Customer rating and review system</li>
            <li>• Verified vendor badge program</li>
            <li>• Performance metrics tracking</li>
            <li>• Trust and credibility building</li>
          </ul>
        </div>
      </div>
    </div>
  );
};