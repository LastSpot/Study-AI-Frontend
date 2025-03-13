
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { GraduationCap, Users, Lightbulb, MessageSquare, Book, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 bg-white">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-study-800">About Study AI</h1>
            <p className="text-xl text-gray-600">Transforming how students learn through conversation, not memorization.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-study-700">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-4">
                  Study AI was born from a shared frustration: traditional studying often focuses on memorization rather than understanding. 
                  As students ourselves, we experienced firsthand the limitations of conventional learning methods.
                </p>
                <p className="mb-4">
                  We envisioned a different approach—one where learning feels like an engaging conversation with a knowledgeable friend 
                  rather than a tedious task of memorizing facts and formulas.
                </p>
                <p>
                  What started as a project among classmates has evolved into a mission to revolutionize 
                  education by making it more intuitive, personalized, and enjoyable for students everywhere.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-study-50 to-study-100 p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-6">
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
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-study-700">Our Mission</h2>
            <div className="bg-study-50 rounded-2xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <Target className="h-12 w-12 text-study-600 mr-4" />
                <h3 className="text-2xl font-bold text-study-700">Revolutionizing Education</h3>
              </div>
              <div className="prose prose-lg max-w-3xl mx-auto">
                <p className="mb-4">
                  We believe education is due for transformation. Our mission is to create a paradigm shift 
                  in how students approach learning—moving from rote memorization to genuine understanding.
                </p>
                <p className="mb-4">
                  Study AI aims to democratize access to personalized learning experiences that adapt to each 
                  student's unique needs, learning style, and pace. We envision a future where education is not a 
                  one-size-fits-all process but a personalized journey.
                </p>
                <p>
                  By leveraging artificial intelligence, we're building tools that don't just help students pass exams, 
                  but foster a lifelong love of learning and deep conceptual understanding that stays with them 
                  throughout their academic and professional careers.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center text-study-700">Our Team</h2>
            <div className="flex justify-center mb-8">
              <Users className="h-16 w-16 text-study-500" />
            </div>
            <p className="text-center text-xl max-w-2xl mx-auto mb-12">
              We're a passionate team of students, educators, and technologists united by a common vision: 
              to make learning more engaging, effective, and enjoyable.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Alex Chen",
                  role: "Founder & Vision",
                  desc: "Computer Science student with a passion for AI and education. Alex experienced firsthand how traditional education often fails to inspire deep understanding."
                },
                {
                  name: "Jamie Rodriguez",
                  role: "Educational Content",
                  desc: "Education major specializing in learning psychology. Jamie brings expertise in how students best absorb and retain information across different subjects."
                },
                {
                  name: "Taylor Kim",
                  role: "AI Development",
                  desc: "Machine learning enthusiast working to make AI interactions feel natural and genuinely helpful for students across diverse learning needs."
                }
              ].map((person, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="w-20 h-20 bg-study-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-study-600">{person.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-bold text-study-700 text-lg mb-1">{person.name}</h3>
                  <p className="text-study-500 text-sm mb-3">{person.role}</p>
                  <p className="text-gray-600 text-sm">{person.desc}</p>
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

export default AboutUs;
