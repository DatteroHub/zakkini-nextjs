"use client";

export const StepsHeader = ({ currentStep }: { currentStep: number }) => {
  const Checked = ({ label }: { label: string }) => (
    <li className="flex items-center justify-end gap-2 text-primary">
      <span className="rounded p-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span>{label}</span>
    </li>
  );

  return (
    <ol className="flex justify-center gap-6 text-xs font-medium text-gray-500 sm:gap-8">
      {currentStep == 1 ? (
        <li className="flex items-center justify-center gap-2 text-muted font-bold">
          <span className="size-6 rounded bg-primary text-center text-[10px]/6 font-bold">
            1
          </span>
          <span className="text-primary">Your info</span>
        </li>
      ) : (
        <Checked label="Your info" />
      )}
      {currentStep == 2 ? (
        <li className="flex items-center justify-center gap-2 text-muted font-bold">
          <span className="size-6 rounded bg-primary text-center text-[10px]/6 font-bold">
            2
          </span>
          <span className="text-primary">Living Country</span>
        </li>
      ) : currentStep < 2 ? (
        <li className="flex items-center justify-end gap-2">
          <span className="size-6 rounded bg-accent text-center text-[10px]/6 font-bold text-gray-600">
            2
          </span>
          <span>Country</span>
        </li>
      ) : (
        <Checked label="Country" />
      )}
      {currentStep == 3 ? (
        <li className="flex items-center justify-center gap-2 text-muted font-bold">
          <span className="size-6 rounded bg-primary text-center text-[10px]/6 font-bold">
            3
          </span>
          <span className="text-primary">Hawl Day</span>
        </li>
      ) : currentStep < 3 ? (
        <li className="flex items-center justify-end gap-2">
          <span className="size-6 rounded bg-accent text-center text-[10px]/6 font-bold text-gray-600">
            3
          </span>
          <span>Hawl Day</span>
        </li>
      ) : (
        <Checked label="Hawl Day" />
      )}
    </ol>
  );
};
