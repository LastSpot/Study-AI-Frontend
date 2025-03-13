import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Study AI?",
      answer: "Study AI is an advanced learning assistant that helps students study more efficiently by providing personalized answers based on their uploaded course materials. Unlike generic AI tools, Study AI understands your specific lecture notes, textbooks, and study materials to provide contextually relevant support."
    },
    {
      question: "Why isn't Study AI free?",
      answer: "Study AI requires sophisticated AI infrastructure and continuous development to maintain its high quality. The subscription model allows us to provide personalized, accurate assistance while constantly improving our technology. We offer affordable pricing plans specifically designed for students."
    },
    {
      question: "Does Study AI actually work?",
      answer: "Yes! Students from top universities have reported significant improvements in their study efficiency and comprehension after using Study AI. Our system has been trained to understand complex academic materials across various disciplines, providing accurate, contextual responses."
    },
    {
      question: "How does Study AI understand my specific materials?",
      answer: "Study AI uses advanced machine learning to analyze and understand your uploaded materials. When you upload lecture notes, textbooks, or study guides, our system processes this information to create a customized knowledge base that it references when answering your questions."
    },
    {
      question: "Is my academic content secure?",
      answer: "Absolutely. We prioritize the security and privacy of your academic materials. All uploaded content is encrypted, stored securely, and never shared with third parties. Your materials are only used to enhance your personal Study AI experience."
    },
    {
      question: "Can Study AI handle any subject?",
      answer: "Study AI is designed to work across a wide range of academic disciplines – from humanities and social sciences to STEM fields. Whether you're studying quantum physics, literary theory, or economic principles, Study AI can help you better understand your course materials."
    }
  ];

  return (
    <section id="faq" className="section bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-study-50 text-study-600 rounded-full text-sm font-medium">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about Study AI and how it can transform your learning experience.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  <div className="px-1 py-2">
                    <p className="text-base md:text-lg font-normal tracking-wide">
                      {faq.answer.split('. ').map((sentence, i, arr) => (
                        <span key={i}>
                          {sentence}{i < arr.length - 1 ? '. ' : ''}
                          {i < arr.length - 1 && (i + 1) % 2 === 0 && <br className="hidden md:block" />}
                        </span>
                      ))}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
