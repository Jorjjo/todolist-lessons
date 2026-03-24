import { useState } from 'react';
import './App.css';
import { Task, TodolistItem } from './TodolistItem';
import { v1 } from 'uuid';

export type FilterType = 'all' | 'active' | 'completed';

export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ]);

    console.log(tasks);

    const deleteTask = (taskId: Task['id']) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
    };

    const createTask = (taskTitle: Task['title']) => {
        const newTask = { id: v1(), title: taskTitle, isDone: false };
        const newTasks = [newTask, ...tasks]; //const newTasks: Task[] = [newTask, ...tasks];
        setTasks(newTasks);
    };

    const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

    let tasksForTodolist = tasks;
    if (currentFilter === 'active') {
        tasksForTodolist = tasks.filter((task) => !task.isDone);
    }
    if (currentFilter === 'completed') {
        tasksForTodolist = tasks.filter((task) => task.isDone);
    }

    const changeFilter = (filter: FilterType) => {
        setCurrentFilter(filter);
    };

    const changeStatus = (taskId: string, isDone: boolean) => {
        let taskToChangeStatus = tasks.find((task) => {
            return task.id === taskId;
        });
        if (taskToChangeStatus) {
            taskToChangeStatus.isDone = isDone;
        }

        setTasks([...tasks]);
    };

    return (
        <div className='app'>
            <TodolistItem
                title='What to learn?'
                tasks={tasksForTodolist}
                filter={currentFilter}
                date='27.07.2027'
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeStatus}
            />
        </div>
    );
};
