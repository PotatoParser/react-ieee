import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import eventsImage from '../assets/home.png';

const iframe_cal = '<iframe src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=berkeley.edu_9k08nrpdahaujiva7u1ss9j92s%40group.calendar.google.com&amp;color=%238D6F47&amp;ctz=America%2FLos_Angeles" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>';
const iframe_airtable = '<script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrUx5RnoM7qhuzXL?backgroundColor=blue" frameborder="0" onmousewheel="" width="100%" height="1229" style="background: transparent; border: 1px solid #ccc;"></iframe>'

class Calendar extends Component {
    constructor() {
        super();
    }
    iframe() {
        return {__html: this.props.iframe};
    }
    render() {
        return (
          <div>
            <div dangerouslySetInnerHTML={ this.iframe() } />
          </div>
        );
    }
}

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
      <div className="main">
        <div className="hero"
        style={{ backgroundImage: "url(" + eventsImage + ")" }}>
        </div>
        <div className="submenu">
        <ul>
          <Link to={"/events"}><li className="">All Events</li></Link>
          <Link to={"/events/Calendar"}><li className="">Calendar</li></Link>
        </ul>
      </div>
      <div class="content">
      <div class="left">
        <span class="heading blue">All Events</span>

        <div id="eventList">

        <div class="event">
            <div class="date">
                <span class="number">
                    5{/*DATE OF EVENT*/}
                </span>
                <span class="month">
                    OCT{/*EVENT MONTH*/}
                </span>
            </div>

            <div class="event-past www">
                <span class="event-title">
                    <p class="event-title">
                        IEEE Movie Night{/*NAME OF EVENT*/}
                    </p>
                </span>
                <div class="details">
                    <span class="event-location">
                        <span aria-hidden="true" class="icon icon-location"></span>
                        HP Auditorium{/*EVENT LOCATION*/}
                    </span>
                    <span class="event-time">
                        <span aria-hidden="true" class="icon icon-clock"></span>
                        6-10pm{/*TIME OF EVENT*/}
                    </span>
                    <p>
                        {/*INFORMATION ABOUT EVENT*/}
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
