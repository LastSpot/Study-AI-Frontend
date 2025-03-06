
import React from 'react';
import { 
  BookOpenText,
  Brain,
  MessageSquare,
  Clock,
  Search,
  Lock,
  Zap,
  GraduationCap
} from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="feature-card animate-fade-in">
      <div className="w-12 h-12 mb-5 rounded-xl bg-study-50 flex items-center justify-center text-study-500">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <BookOpenText className="h-6 w-6" />,
      title: "PDF Upload & Analysis",
      description: "Upload any lecture PDF and our AI will analyze and understand the content within seconds."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Context-Aware AI",
      description: "Our chatbot understands specific content from your lecture material for focused assistance."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Personalized Support",
      description: "Get answers to your questions based on your specific lecture material, not generic responses."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Hyperfocus Context",
      description: "The AI maintains complete awareness of your lecture content for accurate, relevant answers."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Saving",
      description: "Get immediate clarification on complex concepts without searching through pages of notes."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Private & Secure",
      description: "Your lecture materials remain private and secure; we never share your uploads."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Responses",
      description: "Receive immediate, thoughtful responses to help you maintain your study momentum."
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Study Smarter",
      description: "Improve comprehension and retention by engaging with material through conversation."
    }
  ];

  return (
    <section id="features" className="section bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 bg-study-50 text-study-600 rounded-full text-sm font-medium">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your AI Study Companion
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Study AI transforms how you interact with your lecture materials, making studying more efficient and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
