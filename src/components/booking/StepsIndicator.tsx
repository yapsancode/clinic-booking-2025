"use client";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  title: string;
};

const steps: Step[] = [
  { id: 1, title: "Book Appointment" },
  { id: 2, title: "Review & Confirm" },
  { id: 3, title: "Success" },
];

export default function StepsIndicator({ currentStep }: { currentStep: number }) {
  return (
    <nav className="mb-8" aria-label="Progress">
      <ol className="flex items-center justify-center space-x-2 sm:space-x-6">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <li key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300",
                    isCompleted
                      ? "bg-teal-500 text-white"
                      : isActive
                      ? "bg-teal-500 text-white ring-4 ring-teal-100"
                      : "bg-gray-200 text-gray-500"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <svg 
                      className="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                
                {/* Step Title */}
                <span
                  className={cn(
                    "mt-2 text-xs sm:text-sm font-medium text-center transition-colors duration-300",
                    isActive 
                      ? "text-teal-600" 
                      : isCompleted 
                      ? "text-teal-600" 
                      : "text-gray-500"
                  )}
                >
                  {step.title}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "h-0.5 w-8 sm:w-16 mx-2 transition-all duration-300",
                    isCompleted ? "bg-teal-500" : "bg-gray-200"
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}