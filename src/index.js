import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Navbar from './components/navbar';
import MyPage from './components/explorePage/ExplorePage';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <MyPage />
      </div>
    );
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);