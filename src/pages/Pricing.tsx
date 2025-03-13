import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, MessageSquare, Book, Lightbulb } from 'lucide-react';

type ButtonVariant = "default" | "outline" | "secondary";

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
        variant={buttonVariant as ButtonVariant} 
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
                  "Upload up to 10 documents per day",
                  "Unlimited questions",
                  "Standard response speed",
                  "Access to basic models"
                ]}
                buttonText="Get Started"
                buttonVariant="outline"
              />
              
              <PricingTier 
                title="Student" 
                price="$5"
                description="Perfect for the serious student with regular study needs."
                features={[
                  "Everything in Basic, plus more",
                  "Upload up to 50 documents per day",
                  "Faster response time",
                  "Access to premium models",
                  "Cross-reference across documents",
                  "Flashcard generation",
                ]}
                buttonText="Start Free Trial"
                recommended={true}
              />
              
              <PricingTier 
                title="Scholar" 
                price="$10"
                description="For power users who need comprehensive study assistance."
                features={[
                  "Everything in Student, plus more",
                  "Unlimited document uploads",
                  "Priority response speed",
                  "Advanced cross-document analysis",
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
                Contact our team to learn more about our educational partnerships. Our contact can be found below.
              </p>
              {/* <Button variant="outline" size="lg">
                Contact Sales
              </Button> */}
            </div>

            <div className="mt-16 grid md:grid-cols-4 gap-6">
              {[
                { icon: <GraduationCap className="h-8 w-8 text-study-600" />, title: "Student-Centered", desc: "Built by students, for students" },
                { icon: <MessageSquare className="h-8 w-8 text-study-600" />, title: "Conversational", desc: "Learning through dialogue" },
                { icon: <Book className="h-8 w-8 text-study-600" />, title: "Deep Learning", desc: "Understanding, not memorizing" },
                { icon: <Lightbulb className="h-8 w-8 text-study-600" />, title: "Innovative", desc: "Reimagining education" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="font-bold text-study-700 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
