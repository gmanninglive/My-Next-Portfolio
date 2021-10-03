import { useState } from "react";
export default function Alert({title, description, color}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    /**
     * Bug in mobile for Alert margins.
     * Current fix is right margin 2 on mobile. 0 on medium screen+
    */
    <div
      className={`${isOpen ? "absolute" : "hidden"} bottom-2 mr-2 md:mr-0 my-6`}
      role="alert"
    >

      <div
        className={`bg-${color}-100 border border-${color}-400 text-${color}-700 
        px-4 py-3 rounded relative
        flex flex-col flex-wrap `}
      >
        <strong className="font-bold">{title}</strong>
        <span className="block sm:inline">
          {description}
        </span>
        <span className="absolute top-0 right-0 px-4 py-3">
          <button onClick={() => setIsOpen(false)}>
            <svg
              className={`fill-current h-6 w-6 text-${color}-500`}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}