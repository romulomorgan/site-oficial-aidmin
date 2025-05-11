
import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    faqRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      faqRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);

  return (
    <div className="max-w-[895px] mx-auto items-center flex flex-col gap-4 pt-4">
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => (faqRefs.current[index] = el)}
          className="faq-item items-center flex w-full max-w-[895px] flex-col overflow-hidden bg-white rounded-lg"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-5 px-6 py-[26px] hover:bg-gray-50 transition-colors"
          >
            <div className="text-[#222222] text-lg font-semibold leading-[24px] text-left">
              {item.question}
            </div>
            <span className="text-[#FF196E]">
              <Plus size={24} />
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-[#222222] animate-fade-in">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
