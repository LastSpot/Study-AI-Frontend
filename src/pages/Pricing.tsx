
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonVariant = "default",
  recommended = false
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  buttonVariant?: "default" | "outline" | "secondary"; 
  recommended?: boolean;
}) => {
  return (
    <div className={`rounded-2xl p-8 h-full flex flex-col ${recommended ? 'border-2 border-study-500 shadow-lg relative' : 'border border-gray-200'}`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-study-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Recommended
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== 'Free' && <span className="text-gray-600">/month</span>}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex-grow">
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-study-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button 
        variant={buttonVariant as any} 
        size="lg" 
        className={`w-full ${buttonVariant === "default" ? "bg-study-500 hover:bg-study-600" : ""}`}
        asChild
      >
        <Link to="/signup">{buttonText}</Link>
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white pt-24">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that best fits your needs. All plans include a 7-day free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <PricingTier 
                title="Basic" 
                price="Free"
                description="Get started with Study AI and experience the basics."
                features={[
                  "Basic document analysis",
                  "Limited questions per day (10)",
                  "Standard response speed",
                  "Access to general knowledge base",
                  "Web-based platform only"
                ]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              
              <PricingTier 
                title="Student" 
                price="$5"
                description="Perfect for the serious student with regular study needs."
                features={[
                  "Upload up to 20 documents",
                  "Unlimited questions",
                  "Faster response time",
                  "Access to specialized subject knowledge",
                  "Cross-reference across documents",
                  "Mobile app access"
                ]}
                buttonText="Start Free Trial"
                recommended={true}
              />
              
              <PricingTier 
                title="Scholar" 
                price="$10"
                description="For power users who need comprehensive study assistance."
                features={[
                  "Unlimited document uploads",
                  "Priority response speed",
                  "Advanced cross-document analysis",
                  "Citation generation",
                  "Study progress tracking",
                  "Flashcard generation",
                  "Custom knowledge integration",
                  "Early access to new features"
                ]}
                buttonText="Start Free Trial"
                buttonVariant="secondary"
              />
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Need a custom plan for your institution?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We offer special pricing for schools, universities, and educational organizations.
                Contact our team to learn more about our educational partnerships.
              </p>
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
