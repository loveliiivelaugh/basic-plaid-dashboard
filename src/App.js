
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/muiTemplates/Dashboard/Dashboard';
import PlaidVisuals from './components/plaid/PlaidVisuals';

function App() {
  return (
    <Dashboard content={( <PlaidVisuals /> )}/>
  );
};

export default App;
