import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Navbar from './components/navbar';
import ExplorePage from './components/explorePage/ExplorePage';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

  render() {
    return (
      <div className='page-container'>
        <Navbar />
        <ExplorePage />
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);