import React from 'react';

function TimeCard({ text }) {
  return (
    <div
      className="mt-3 relative px-4 py-1 border border-border before:absolute before:size-4 
            before:rotate-44 before:bg-background before:-top-2 before:left-2 before:border-t before:border-l before:border-border"
    >
      {text}
    </div>
  );
}

export default TimeCard;
