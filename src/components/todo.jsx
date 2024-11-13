import React, { useState } from "react";
import './todo.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrashAlt, faSave, faCheck } from "@fortawesome/free-solid-svg-icons";

const Todo = () => {
    const [initial, setInitial] = useState("");
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const getInput = (event) => {
        setInitial(event.target.value);
    };
    
    const getData = () => {
        const dateAdded = new Date().toLocaleString();  // Get the current date and time

        if (isEditing) {
            const updatedData = data.map((item, index) =>
                index === editIndex ? { ...item, text: initial } : item
            );
            setData(updatedData);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setData([...data, { text: initial, completed: false, dateAdded }]);
        }
        setInitial("");
    };

    const editTask = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setInitial(data[index].text);
    };

    const deleteTask = (index) => {
        const filteredData = data.filter((_, id) => id !== index);
        setData(filteredData);
    };

    const toggleComplete = (index) => {
        const updatedData = data.map((item, id) => 
            id === index ? { ...item, completed: !item.completed } : item
        );
        setData(updatedData);
    };

    return (
        <>
            <div className="container">
                <div className="inputTask">
                    <input
                        type="text"
                        placeholder="Enter your task"
                        value={initial}
                        onChange={getInput}
                    />
                    <button onClick={getData}>
                        {isEditing ? (
                            <>
                                <FontAwesomeIcon icon={faSave} /> Update
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPlus} /> Add
                            </>
                        )}
                    </button>
                </div>
                {data.map((task, index) => (
                    <div className={`taskData ${task.completed ? 'completed' : ''}`} key={index}>
                        <div className="taskText">
                            <p>{task.text}</p>
                            <small className="taskDate">Added on: {task.dateAdded}</small>
                        </div>
                        <button onClick={() => toggleComplete(index)}>
                            <FontAwesomeIcon icon={faCheck} /> {task.completed ? "Undo" : "Done"}
                        </button>
                        <button onClick={() => editTask(index)}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                        <button onClick={() => deleteTask(index)}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Remove
                        </button>
                    </div>
                ))}
            </div>
            {/* Footer with credit */}
            <footer className="footer">
                <p>Created by @manoranjan</p>
            </footer>
        </>
    );
};

export default Todo;
