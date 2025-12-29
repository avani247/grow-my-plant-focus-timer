import React from 'react';

interface PlaceholderViewProps {
  title: string;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-neo-offwhite">
      <div className="bg-white border-3 border-black p-8 shadow-neo max-w-xs transform hover:rotate-2 transition-transform duration-300">
        <div className="w-12 h-12 bg-neo-pink border-3 border-black rounded-full mx-auto mb-4"></div>
        <h2 className="text-2xl font-display font-bold uppercase leading-tight mb-4">
          {title}
        </h2>
        <p className="font-sans font-bold text-xs sm:text-sm bg-black text-white inline-block px-3 py-1">
          COMING SOON
        </p>
      </div>
    </div>
  );
};

export default PlaceholderView;