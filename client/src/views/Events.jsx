import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import eventsImage from '../assets/home.png';

class Events extends Component {
  constructor() {
    super();
    this.currentPage = 1;
    this.state = {numEvents: 10};
    let self = this;
  }

  componentDidMount() {
    this.changePage(1, null);
    this.setState(previousState => {
      return { numEvents: document.getElementById('eventList').childNodes.length }
    })
  }

  range(n) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  }

  changePage(n, e) {
    let newPage;
    let numEvents = this.state.numEvents;

    if (e == null) newPage = n;
    else {
      if (e.target.innerText == 'Next ›') {
        newPage = this.currentPage + 1;
      } else {
        newPage = parseInt(e.target.innerText);
      }
    }
    if (newPage > Math.ceil(numEvents / 4)) return;

    let arr = document.getElementById('eventList').getElementsByClassName('event');
    let steps = 0;

    for (let i = 0; i < (newPage - 1) * 4; i++) {
      steps += 1;
      arr[i].style.display = 'none';
    }

    if (steps < arr.length)
      arr[steps].style.display = 'block';
    if (steps + 1 < arr.length)
      arr[steps + 1].style.display = 'block';
    if (steps + 2 < arr.length)
      arr[steps + 2].style.display = 'block';
    if (steps + 3 < arr.length)
      arr[steps + 3].style.display = 'block';

    for (let i = steps + 4; i < arr.length; i++) {
      arr[i].style.display = 'none';
    }

    this.currentPage = newPage;
  }

  render() {
    let self = this;
    return (
      <div>
        <div className="hero"
        style={{ backgroundImage: "url(" + eventsImage + ")" }}>
        </div>
        <div className="submenu">
        <ul>
          <Link to={"/industry"}><li className="">All Events</li></Link>
          {/*<Link to={"/industry/donate"}><li className="">Photos</li></Link>*/}
        </ul>
      </div>
      <div class="content">
      <div class="left">
        <span class="heading blue">All Events</span>

        <div id="eventList">

        <div class="event">
        <div class="date">
        <span class="number">
        14
        </span>
        <span class="month">
        Mar
        </span>
        </div>
        <div class="event-past www">
        <span class="event-title">
        <p class="event-title">Palo Alto Networks Dinner</p>
        </span>
        <div class="details">
        <span class="event-location">
        <span aria-hidden="true" class="icon icon-location"></span>
        Cory 258
        </span>
        <span class="event-time">
        <span aria-hidden="true" class="icon icon-clock"></span>
        Wednesday, 6 pm - 9 pm
        </span>
        <p>
        Come talk with a few engineers and a recruiter from Palo Alto Networks! Find out the daily lives of Palo Alto Network engineers and ask them questions it on their projects. This event is only open for IEEE members. 
        </p>
        </div>
        </div>
        </div>

        <div class="event">
        <div class="date">
        <span class="number">
        15
        </span>
        <span class="month">
        Mar
        </span>
        </div>
        <div class="event-past www">
        <span class="event-title">
        <p class="event-title">IEEE 2nd General Meeting</p>
        </span>
        <div class="details">
        <span class="event-location">
        <span aria-hidden="true" class="icon icon-location"></span>
        Wozniak Lounge
        </span>
        <span class="event-time">
        <span aria-hidden="true" class="icon icon-clock"></span>
        Thursday, 8 pm
        </span>
        <p>
        
        </p>
        </div>
        </div>
        </div>

        </div>

        <div class="event-pagination">
        <nav class="pagination">
          {this.range(Math.ceil(this.state.numEvents/4)).map(function(index) {
            return <span><a style={{cursor: "pointer"}} onClick={(e) => self.changePage(null, e)}>{index} &nbsp;</a></span>;
          })}

        <span class="page gap">… &nbsp;</span>

        <span class="blue">
          <a style={{cursor: "pointer"}} onClick={(e) => this.changePage(null, e)}>Next ›</a>
        </span>


        </nav>

        </div>
        </div>

        </div>
      </div>
    );
  }
}

export default Events;