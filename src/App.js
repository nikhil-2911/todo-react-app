import './App.css';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { db } from './firebase_config';
import firebase from 'firebase';
import TodoListItem from './todo';

const App = () => {

  // Reack hooks
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  const getTodos = () => {
    db.collection("todos").onSnapshot((querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id : doc.id,
          todo : doc.data().todo,
          inProgress : doc.data().inProgress,
        }))
      );
    });
  };
  
  const addTodo = (e) => {
    e.preventDefault();
    // console.log(`adding todo to firebase`);

    db.collection("todos").add({
      inProgress : true,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      todo : todoInput,
    });

    setTodoInput("");
  };

  return (
    <div className="App">
      <div
        style={{
          display : 'flex',
          flexDirection : 'column',
          justifyContent : 'center',
          alignItems : 'center',
        }}  
      >
        <h1>Nikhil Kumar Todos App 📚</h1>
        <form>
          <TextField 
            id="standard-basic" 
            label="Write a Todo"
            value={todoInput}
            onChange={(e) => 
              {
                setTodoInput(e.target.value);
                // console.log(`This is the todo input ${e.target.value}`);
              }
            }
            style={{
              maxWidth : "500px",
              width : "90vh",
            }}
          />
          <Button type="submit" variant="contained" onClick={addTodo} style={{display : "none"}}>
            Default
          </Button>
        </form>
        {/* Use {} braces to use javascript inside html/jsx */}
        <div style={{marginTop : "20px"}}>
          {todos.map((todo) => {
            return(
              <TodoListItem 
                todo={todo.todo}
                inProgress={todo.inProgress} 
                id={todo.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
