import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface AccordionProps {
  title: string;
  children?: ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="group" data-opened={isOpen}>
      <button
        className="group/item py-1 w-full flex items-center justify-between border-b border-slate-200 focus:outline-slate-400"
        onClick={toggle}
      >
        <span className="group-hover/item:underline">{title}</span>
        <ChevronDown
          size={16}
          className={twMerge(
            "transition-all",
            "group-data-[opened=true]:rotate-180"
          )}
        />
      </button>
      <div
        className={twMerge(
          "h-auto max-h-0 transition-all overflow-hidden",
          "group-data-[opened=true]:max-h-32 group-data-[opened=true]:py-2"
        )}
      >
        {children}
      </div>
    </div>
  );
}
