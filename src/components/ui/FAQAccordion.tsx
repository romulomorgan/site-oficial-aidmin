
import React, { useState } from 'react';
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

  return (
    <div className="max-w-[895px] mx-auto items-center flex flex-col gap-4 pt-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="items-center flex w-full max-w-[895px] flex-col overflow-hidden bg-white rounded-lg"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-5 px-6 py-[26px]"
          >
            <div className="text-[#222222] text-lg font-semibold leading-[24px] text-left">
              {item.question}
            </div>
            <span className="text-[#FF196E]">
              <Plus size={24} />
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-[#222222]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
