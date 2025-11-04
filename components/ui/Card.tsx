
import React from 'react';

export const Card: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
  <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
  <div className={`p-6 border-b border-gray-700 ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
  <h2 className={`text-xl font-bold text-white ${className}`}>
    {children}
  </h2>
);

export const CardDescription: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
  <p className={`text-sm text-gray-400 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
  <div className={`p-6 bg-gray-800/30 rounded-b-xl border-t border-gray-700 ${className}`}>
    {children}
  </div>
);
