import React, { createContext, useContext, useState } from 'react';

interface AccordionContextType {
  openValues: string[];
  toggleValue: (value: string) => void;
  collapsible?: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  collapsible = true,
  defaultValue,
  className = '',
  children
}) => {
  const initial = Array.isArray(defaultValue)
    ? defaultValue
    : defaultValue
    ? [defaultValue]
    : [];
  const [openValues, setOpenValues] = useState<string[]>(initial);

  const toggleValue = (val: string) => {
    if (type === 'single') {
      if (openValues.includes(val)) {
        if (collapsible) {
          setOpenValues([]);
        }
      } else {
        setOpenValues([val]);
      }
    } else {
      if (openValues.includes(val)) {
        setOpenValues(openValues.filter((v) => v !== val));
      } else {
        setOpenValues([...openValues, val]);
      }
    }
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggleValue, collapsible }}>
      <div className={`space-y-1 divide-y divide-indigo-400/15 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  className = '',
  children
}) => {
  return (
    <div data-value={value} className={`py-1 border-b border-indigo-400/15 last:border-b-0 ${className}`}>
      {children}
    </div>
  );
};

interface AccordionTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  value,
  className = '',
  children
}) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionTrigger must be used inside Accordion');

  const isOpen = ctx.openValues.includes(value);

  return (
    <button
      type="button"
      onClick={() => ctx.toggleValue(value)}
      className={`w-full py-4 px-2 flex items-center justify-between text-left font-serif text-sm font-semibold tracking-wider text-slate-100 hover:text-[#dfb872] transition-colors focus:outline-none ${className}`}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <span
        className={`text-[#dfb872] text-xs transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }`}
      >
        ▼
      </span>
    </button>
  );
};

interface AccordionContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  value,
  className = '',
  children
}) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionContent must be used inside Accordion');

  const isOpen = ctx.openValues.includes(value);

  if (!isOpen) return null;

  return (
    <div
      className={`px-2 pb-4 pt-1 text-sm text-slate-300 animate-fadeIn ${className}`}
    >
      {children}
    </div>
  );
};

export default Accordion;
