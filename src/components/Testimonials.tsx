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
      name: "Tintin Nguyen",
      title: "PhD Astronomy Student",
      rating: 5,
      avatar: "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
      delay: "delay-[100ms]"
    },
    {
      quote: "I was struggling with complex physics concepts until I started using Study AI. The contextual understanding is impressive - it's like having a tutor who read my notes!",
      name: "Kevin Li",
      title: "Physics Major",
      rating: 5,
      avatar: "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
      delay: "delay-[300ms]"
    },
    {
      quote: "Study AI has revolutionized my study routine! I used to spend hours sifting through PDFs, but now I get instant summaries and answers. It's like having a super-efficient study buddy.",
      name: "Eira Wang",
      title: "Pre-med Student",
      rating: 4,
      avatar: "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
      delay: "delay-[500ms]"
    }
  ];

  const universities = [
    {
      name: "Harvard University",
      logo: "https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png",
    },
    {
      name: "UMass Amherst",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/UMass_Seal_Medium_PMS_202.png",
    },
    {
      name: "University of Toronto",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1280px-Utoronto_coa.svg.png",
    },
    {
      name: "Boston University",
      logo: "https://www.bu.edu/brand/files/2019/06/master_logo.gif",
    },
    {
      name: "University of Connecticut",
      logo: "https://brand.uconn.edu/wp-content/uploads/sites/14/2019/08/husky-logo-lockup-circleR.jpg",
    },
    {
      name: "Northeastern University",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/NU_RGB_seal_R.png",
    },
  ];

  // Calculate the average rating
  const averageRating = (testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length).toFixed(1);

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
            <span className="bg-study-100 text-study-600 px-2.5 py-1 rounded-full text-sm">{averageRating}/5</span>
            <span>Average student satisfaction</span>
          </div>
        </div>

        {/* University Logo Showcase */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-semibold text-gray-900 mb-8">
            Our Students Come From Top Universities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {universities.map((university, index) => (
              <div 
                key={index} 
                className="relative h-[75%] w-full lg:filter lg:grayscale lg:hover:grayscale-0"
              >
                <img
                  src={university.logo}
                  alt={`${university.name} logo`}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
