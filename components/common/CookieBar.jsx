import Link from "next/link";
import React from "react";

const FeatureBar = (props) => {
  const { action, hide } = props;

  return (
    <div>
      {!hide && (
        <div className="text-center p-6 bg-white text-sm flex-row justify-center items-center font-medium fixed bottom-0 w-full z-30 transition-all duration-300 ease-out border-t-2">
          <span className="block">
            This site uses only essential cookies to. By clicking, you
            agree to our
            <Link href="/">
              <a> Privacy Policy</a>
            </Link>
          </span>
          {action && action}
        </div>
      )}
    </div>
  );
};

export default FeatureBar;