
import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  avatarUrl: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  testimonial,
  avatarUrl
}) => {
  const defaultAvatar = "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true";
  
  return (
    <div className="testimonial-card backdrop-blur-[10px] flex w-full flex-col items-stretch bg-[rgba(255,255,255,0.05)] px-6 py-[30px] rounded-xl hover-shadow">
      <div className="flex items-stretch gap-2.5">
        <div className="max-w-[45px] overflow-hidden rounded-[76px]">
          <img
            src={avatarUrl || defaultAvatar}
            alt={`${name}'s avatar`}
            className="aspect-[1] object-contain w-[45px] max-w-[45px] hover-scale"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultAvatar;
            }}
          />
        </div>
        <div className="flex flex-col items-stretch text-white font-normal">
          <div className="text-base font-normal leading-[24px]">
            {name}
          </div>
          <div className="text-xs font-normal leading-[18px]">
            {role}
          </div>
        </div>
      </div>
      <div className="text-white text-lg font-normal leading-[27.9px] mt-4">
        {testimonial}
      </div>
    </div>
  );
};
