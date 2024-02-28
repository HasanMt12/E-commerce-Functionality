import { Sparkle } from "lucide-react";


const SectionHeading = ({ headingText }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-12 mb-6">
      <h2 className="font-bold text-2xl text-[#526D82]">{headingText}</h2>
      <div className="flex justify-center items-center gap-2 text-[#526D82]">
        <div className="w-[35px] h-[2px] bg-[#526D82]"></div>
        <Sparkle />
        <div className="w-[35px] h-[2px] bg-[#526D82]"></div>
      </div>
    </div>
  );
};

export default SectionHeading;
