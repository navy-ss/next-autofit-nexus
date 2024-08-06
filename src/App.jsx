import "./App.css";
import './styles/components/Main/index.scss';
import "antd/dist/reset.css";
import history from "./utils/history.js";
import { BrowserRouter } from 'react-router-dom';
import PageLayout from './pages/pageLayout.jsx';

function App() {
  return (
    <BrowserRouter history={history} >
      <div className="App">
        <PageLayout />
      </div>
    </BrowserRouter>
  )
}

export default App;
