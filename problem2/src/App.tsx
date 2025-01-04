import React from 'react';
import SwapForm from './components/CurrencySwapForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <SwapForm />
    </div>
  );
};

export default App;