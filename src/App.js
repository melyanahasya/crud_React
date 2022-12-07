import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationNavbar from './component/NavigationNavbar';
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
     <NavigationNavbar/>
     <BrowserRouter>
     <main>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/edit/:id" component={Edit} exact/>
        <Route path="/login" component={Login} exact/>
      </Switch>
     </main>
     </BrowserRouter>
    </div>
  );
}

export default App;
