
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
  avatar: string;
  delay: string;
}

const Testimonial = ({ quote, name, title, rating, avatar, delay }: TestimonialProps) => {
  return (
    <div className={`glass-card rounded-xl p-6 shadow-sm animate-fade-in-up ${delay}`}>
      <div className="flex space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div className="flex items-center">
        <img 
          src={avatar} 
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow-sm" 
        />
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Study AI has been a game-changer for my exam preparation. Having a chatbot that understands my specific lecture material makes studying so much more efficient.",
      name: "Emma Johnson",
      title: "Computer Science Student",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      delay: "delay-[100ms]"
    },
    {
      quote: "I was struggling with complex physics concepts until I started using Study AI. The contextual understanding is impressive - it's like having a tutor who read my notes!",
      name: "Michael Chen",
      title: "Physics Major",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      delay: "delay-[300ms]"
    },
    {
      quote: "As a medical student with mountains of lecture notes, Study AI helps me quickly find information and understand difficult concepts. It's indispensable for my studies.",
      name: "Sarah Patel",
      title: "Medical Student",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      delay: "delay-[500ms]"
    }
  ];

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 bg-study-50 text-study-600 rounded-full text-sm font-medium">
            Student Experiences
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have transformed their study sessions with Study AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
              avatar={testimonial.avatar}
              delay={testimonial.delay}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-study-500 font-medium">
            <span className="bg-study-100 text-study-600 px-2.5 py-1 rounded-full text-sm">4.9/5</span>
            <span>Average student satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
