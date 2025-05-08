
import React from 'react';
import { CustomButton } from './CustomButton';

export const NavigationBar: React.FC = () => {
  return (
    <nav className="items-center absolute z-10 flex w-[1140px] max-w-full text-base text-white leading-loose flex-wrap gap-[305.4px] top-[30px] inset-x-[390px]">
      <div className="max-w-[1140px] justify-center items-center self-stretch flex text-[32px] text-[#ff196e] font-semibold whitespace-nowrap capitalize leading-[0.7] grow shrink w-[106px] my-auto">
        <div className="max-w-[940px] justify-center items-stretch self-stretch flex w-[130px] gap-1.5 my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/5b8e380689abbb696f1a70d356bb34fb2c6e00d8?placeholderIfAbsent=true"
            alt="Virtia Logo"
            className="aspect-[1] object-contain w-9 shrink-0 rounded-[500px]"
          />
          <div className="text-[32px] font-semibold leading-[22.4px]">
            Virtia
          </div>
        </div>
      </div>
      
      <div className="justify-center items-center border-[rgba(255,255,255,0.10)] backdrop-blur-[10px] min-w-[240px] bg-[rgba(255,255,255,0.04)] my-auto px-[17px] py-[1px] rounded-[99px] border border-solid">
        <div className="justify-center items-center self-stretch flex min-w-60 gap-2 my-auto pr-2">
          <a href="#" className="px-2 py-3 hover:text-[#ff196e] transition-colors">
            Home
          </a>
          <a href="#solutions" className="px-2 py-3 hover:text-[#ff196e] transition-colors">
            Soluções
          </a>
          <a href="#contact" className="px-2 py-3 hover:text-[#ff196e] transition-colors">
            Contato
          </a>
        </div>
      </div>

      <CustomButton variant="primary">
        Soluções
      </CustomButton>
    </nav>
  );
};
