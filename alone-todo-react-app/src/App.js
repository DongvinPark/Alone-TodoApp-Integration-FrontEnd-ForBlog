//import logo from './logo.svg';
import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from '@mui/material';
import './App.css';

import { call } from './service/ApiService';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items:[
        
      ]
    };
  }

  //>>> Method Area <<<


  componentDidMount(){
    //console.log("\tcomponentDidMount called");
    call("/Todo/getTodo", "GET", null).then(
      (response) => this.setState( {items: response.data} )
    );//then
  };//func

/*   add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;
    item.done = false;
    thisItems.push(item);
    this.setState({ items:thisItems });
    console.log("items : ", this.state.items);
  };//func */



  add = (item) => {
    //console.log("add() in App.js called");
    call("/Todo/createTodo", "POST", item).then(
      (response) => this.setState({ items: response.data })
    );//then
  }//func



/*   delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before update itmes : ", this.state.items);
    const newItems = thisItems.filter( e => e.id !== item.id );
    this.setState( { items: newItems }, () => { console.log("Updated Items : ", this.state.items); } );
  };//func */


  delete = (item) => {
    call("/Todo/deleteTodo", "DELETE", item).then(
      (response) => this.setState({ items: response.data })
    );//then
  };//func



  updateTodo = (item) => {
    console.log("updateTodo() in App.js called : ", this.state.items);
    call("/Todo/updateTodo", "PUT", item).then( 
      (response) => this.setState({ items: response.data })
    );//then
  };//func


  addReplyCall = (item) => {
    console.log("App.js addReplyCall param item(from Todo.js) : ", item);
    console.log("addReplyCall before setState : ", this.state.items );
    call("/Todo/makeReply", "POST", item).then(
      (response) => this.setState( { items: response.data }, (console.log("BACK END response : ", response.data, "\nApp.js state : ", this.state.items)) )
    );//then
    console.log("addReplyCall after setState : ", this.state.items);
    window.location.reload();
  };//func


  updateReplyCall (replyItem) {
    console.log("updateReplyCall in App.js called");
    console.log("replyItem param : ", replyItem);
    call("/Todo/updateReply", "PUT", replyItem).then(
      (response) => this.setState( { items: response.data } )
    );//then
  };//func


  deleteReplyCall (replyItem) {
    console.log("deleteReplyCAll in App.js called");
    console.log("replyItem param : ", replyItem);
    call( "/Todo/deleteReply", "DELETE", replyItem ).then(
      (response) => this.setState( { items: response.data } )
    );//then
    window.location.reload();
  };////func



  render(){

    //console.log("App.js render() called");

    var todoItems = this.state.items.length > 0 && (
      <Paper style={ {margin:16} }>
        <List>
          {
            this.state.items.map(
              (item,idx) => (
                            <Todo
                              item={item}
                              key={item.id}
                              delete={this.delete}
                              updateTodo={this.updateTodo}
                              addReplyCall={this.addReplyCall}
                              updateReplyCall={this.updateReplyCall}
                              deleteReplyCall={this.deleteReplyCall}
                            />)
            )//map
          }
        </List>
      </Paper>
    );//var

    return(
      <div className='App'>
        <Container>
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );//return
  }//render
}//end of class

export default App;

/*
App.js??? ?????? ???????????? ?????????.
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
/*
???????????? UI ???????????? ?????? ????????? ?????? ?????????

    var todoItems = this.state.items.map(
      (item, idx) => ( < Todo item={item} key={ item.id } /> )
    );//map

    return(

      <div className='App'>
        {todoItems}
      </div>

    );//return
*/
