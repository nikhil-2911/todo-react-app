import React from 'react';
import {Button, ListItem, ListItemText} from '@material-ui/core';
import { db } from './firebase_config';

export default function TodoListItem({todo, inProgress, id}){

    const toggleInProgress = () => {
        db.collection("todos").doc(id).update({
            inProgress : !inProgress,
        });
    }

    const deleteTodo = () => {
        db.collection("todos").doc(id).delete();
    }

    return(
        <div style={{display : "flex"}}>
            <ListItem>
                <ListItemText primary={todo} secondary={inProgress ? "In Progress" : "Completed"} />
            </ListItem>

            <Button onClick={toggleInProgress}>
                {inProgress ? "Done" : "Undone"}
            </Button>
            <Button onClick={deleteTodo}>X</Button>
        </div>
    );
}
