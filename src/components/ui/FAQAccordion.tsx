import React, { useState } from 'react';

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
    <div className="max-w-[895px] items-center flex w-[895px] flex-col gap-4 pt-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="items-center flex w-full max-w-[895px] flex-col overflow-hidden bg-white rounded-lg"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-stretch gap-5 flex-wrap justify-between px-6 py-[26px]"
          >
            <div className="text-[#222222] text-lg font-semibold leading-[24px]">
              {item.question}
            </div>
            <div className="pb-2">
              <div className="border-[#FF759F] w-[2px] h-[18px] border border-solid" />
              <div className="border-[#FF759F] h-[2px] border border-solid" />
            </div>
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
