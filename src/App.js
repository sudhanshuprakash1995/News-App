import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default class App extends Component {
  name = 'Sudhanshu';
  pageSize=15;
  render() {
    
    return (
      <div>
       
        
        <Router> 
        <NavBar />
          <Routes>
            <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country="us" catagory="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="us" catagory="business" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="us" catagory="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="us" catagory="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country="us" catagory="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="us" catagory="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="us" catagory="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

