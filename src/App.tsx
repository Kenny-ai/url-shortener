import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';

function App() {

  const [showNav, setShowNav] = useState(false);

  const [clicked, setClicked] = useState(false);

  return (
    <div className="App">
      <Header showNav={showNav} setShowNav={setShowNav} />
      <PageOne showNav={showNav} setClicked={setClicked} />
      <PageTwo clicked={clicked} setClicked={setClicked} />
      <Footer />
    </div>
  );
}

export default App;
