import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for individuals getting started',
    features: [
      'Up to 10 tasks',
      'Basic task management',
      'Mobile app access',
      'Email support'
    ],
    buttonText: 'Get Started',
    buttonStyle: 'bg-gray-100 hover:bg-gray-200 text-gray-900'
  },
  {
    name: 'Pro',
    price: 12,
    description: 'Best for professionals and small teams',
    features: [
      'Unlimited tasks & projects',
      'Advanced collaboration',
      'Priority support',
      'Custom workflows',
      'Analytics dashboard',
      'Integrations'
    ],
    buttonText: 'Start Pro Trial',
    buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl',
    popular: true
  },
  {
    name: 'Team',
    price: 24,
    description: 'Designed for growing organizations',
    features: [
      'Everything in Pro',
      'Advanced admin controls',
      'Team analytics',
      'Custom branding',
      'SSO integration',
      'Dedicated support'
    ],
    buttonText: 'Contact Sales',
    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white'
  }
];

export function Pricing() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section ref={elementRef} className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent
            <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent"> pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-500 ${
                plan.popular 
                  ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 scale-105' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              } hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-600 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>All plans include a 30-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  );
}