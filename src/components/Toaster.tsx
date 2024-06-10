import React, { useEffect } from 'react';

interface ToasterProps {
  message: string;
  removeToaster: () => void;
}

const Toaster: React.FC<ToasterProps> = ({ message, removeToaster }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToaster();
    }, 3000);
    return () => clearTimeout(timer);
  }, [removeToaster]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded">
      {message}
    </div>
  );
};

export default Toaster;
