import React, { Component } from 'react';
import config from './config.js';
const firebase = require('firebase')

export class Guestbook extends Component {
    constructor(props) {
      super();
      this.state = {
        name: '',
        desc: '',
        msg: '',
        visibility: '',
        email: '',
        shouldUpdate: false,
        data: [],
      }
    }
  
    componentDidMount(){
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      let ref = firebase.database().ref('data');
      ref.on('value', snapshot => {
        let data = snapshot.val();
          let newData = [];
          let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
          for (let entry in data) {
            let d = new Date(data[entry].date);
            let date = months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" ("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")";
            newData.push({
              id: entry,
              name: data[entry].name,
              desc: data[entry].desc,
              msg: data[entry].msg,
              visibility: data[entry].visibility,
              email: data[entry].email,
              date: date,
            })
          }
          this.setState({data: newData});
      })
    }
  
    componentDidUpdate(prevProps, prevState, snapshot){
      if(this.state.shouldUpdate !== prevState.shouldUpdate){
        let ref = firebase.database().ref('data');
        ref.on('value', snapshot => {
          let data = snapshot.val();
          let newData = [];
          let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
          for (let entry in data) {
            let d = new Date(data[entry].date);
            let date = months[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" ("+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+")";
            newData.push({
              id: entry,
              name: data[entry].name,
              desc: data[entry].desc,
              msg: data[entry].msg,
              visibility: data[entry].visibility,
              email: data[entry].email,
              date: date,
            })
          }
          this.setState({data: newData});
        })
      }
    }
  
    guestbookHandler = (event) => {
      event.preventDefault();
      if (this.state.name === '') {
        alert("Missing name");
      } else if (this.state.msg === '') {
        alert("Missing message");
      } else if (this.state.visibility === '') {
        alert("Missing choice for visibility");
      } else {
        let formObj = {
          name: this.state.name, 
          desc: this.state.desc,
          msg: this.state.msg,
          visibility: this.state.visibility,
          email: this.state.email,
          date: firebase.database.ServerValue.TIMESTAMP,
        };
        firebase.database().ref('data').push().set(formObj);
        this.setState({shouldUpdate: true});
        alert("Message delivered.");
      }
    }
  
    myChangeHandler = (event) => {
      let field = event.target.name;
      let value = event.target.value;
      this.setState({[field]: value});
    }
  
    render() {
      return (
        <div>
          <div className='guestbook'>
            <div id='form-section'>
                <div className='BookEnter'>
                <form onSubmit={this.guestbookHandler}>
                <p>What is your name?<br/>
                <input name='name' type='text' maxLength='30' required onChange={this.myChangeHandler} /></p>
                <p>*A short description of yourself.<br/>
                <input name='desc' type='text' size='50' maxLength='100' onChange={this.myChangeHandler}/>
                </p>              
                <p>Please leave your message:<br/>
                  <textarea name='msg' minLength='5' maxLength='500' required onChange={this.myChangeHandler}></textarea>
                </p>
                <p>Would you like your information to be viewable by other guests?<br/>
                  <select id='visibility' name='visibility' required onChange={this.myChangeHandler}>
                    <option value='none'></option>
                    <option value='private'>No</option>
                    <option value='public'>Yes</option>
                  </select>
                </p>
                <p>*Your E-mail:
                <input name='email' type='text' size='30' onChange={this.myChangeHandler}/>
                </p>
                <p>Note: Information with a "*" means it is option to provide.</p>
                <div>
                  <input type='submit' id='submit' name='submit' value='Sent Message'></input>
                </div>
                </form>
            </div>
            <div className='Bookdisplay'>
                {this.state.data.map((entry) => {
                  if(entry.visibility !== 'private') {
                    if(entry.desc !== '') {
                      return (
                        <div className='public' id={entry.id}>
                          <div>
                            <span className='display-date'>{entry.date}</span>
                            <br></br>
                            <span className='display-name'>{entry.name}</span>
                          </div>
                          <i>{entry.desc}</i><br/>
                          <span className='display-message'>{entry.msg}</span><br/>
                        </div>
                      )
                    } else {
                      return (
                        <div className='private' id={entry.id}>
                          <div>
                            <span className='name'>{entry.name}</span>
                            <span className='date'>{entry.date}</span>
                          </div>
                          <span className='message'>{entry.msg}</span><br/>
                        </div>
                      )
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  
  export default Guestbook;