import { useState } from "react";
import { v4 as uuidv4 } from "uuid";


const Todo = () => {

    const [task, setTask] = useState({
        id:"",
        name: "",
        description: ""
    })

    // let [task, setTask] = useState("")
    const [taskList, setTaskList] = useState([])

    const addTask = () => {
        if (task.name.trim() !== "" && task.description.trim() !== "") {
            // If the task has an id, it means we are editing an existing task
            if (task.id) {
                // console.log(task.id)
                // Find the index of the task in the taskList based on its id
                const taskIndex = taskList.findIndex((t) => t.id === task.id);
                if (taskIndex !== -1) {
                    // Create a new task object with the updated name and description
                    const updatedTask = {
                        ...taskList[taskIndex],
                        name: task.name,
                        description: task.description,
                    };
                    // Create a new task list with the updated task
                    const updatedTaskList = [
                        ...taskList.slice(0, taskIndex),
                        updatedTask,
                        ...taskList.slice(taskIndex + 1),
                    ];
                    setTaskList(updatedTaskList);
                }
            } else {
                // If the task doesn't have an id, it means we are adding a new task
                const newTask = { ...task, id: uuidv4() };
                setTaskList([...taskList, newTask]);
            }
    
            // Clear the input fields after adding/editing the task
            setTask({ id: "", name: "", description: "" });
        }
    };
    

    const getInputHandler = (e)=> {
        setTask({...task, name:e.target.value})
    }

    const getDescriptionHandler = (e)=> {
        setTask({...task, description:e.target.value})
    }

    const editTaskHandler = (taskId) => {
        const taskToEdit = taskList.find((task) => task.id === taskId)
        if (taskToEdit) {
            // console.log(taskToEdit)
            setTask(taskToEdit)
            // console.log(setTask(taskToEdit))
        }
    }

    const deleteTaskHandler = (taskId) => {
        // Filter out the task with the specified taskId from the list
        const updatedTaskList = taskList.filter((task) => task.id !== taskId);
        setTaskList(updatedTaskList);
    };

    return ( 
        <>
            <h1>Todo App</h1>
            <div className="center-container">
                <input type="text" name="task" id="task" value={task.name} onChange={getInputHandler} placeholder="Enter task name"/>
                <textarea name="taskDes" id="taskDes" cols="30" rows="10" value={task.description} onChange={getDescriptionHandler} placeholder="Enter task description"></textarea>
                <button onClick={addTask}>{task.id ? "Edit Task" : "Add Task"}</button>
            </div>
            <ul className="taskList">
                {taskList.map((task, index) => (
                    <li key={task.id} className="task">{index+1}{")"} Task Name: <strong>{task.name}</strong> Task Description: {task.description}
                    <button onClick={() => editTaskHandler(task.id)}>Edit</button>
                    <button onClick={() => deleteTaskHandler(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
     );
}
 
export default Todo;