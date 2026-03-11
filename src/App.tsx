import { useState } from 'react';
import './App.css';
import { Task, TodolistItem } from './TodolistItem';
export type FilterType = 'all' | 'active' | 'completed';
export const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]);

    const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter((task) => {
            return task.id !== taskId;
        });
        setTasks(filteredTasks);
    };
    const changeFilter = (filter: FilterType) => {
        setCurrentFilter(filter);
    };

    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter((task) => !task.isDone);
    }
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter((task) => task.isDone);
    }

    console.log({tasks, filteredTasks});
    

    return (
        <div className='app'>
            <TodolistItem
                title='What to learn?'
                tasks={filteredTasks}
                date='27.07.2027'
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    );
};
