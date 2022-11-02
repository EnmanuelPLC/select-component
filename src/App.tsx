import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import './App.css';
import CustomSelect from './components/select/custom-select';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <CustomSelect />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
