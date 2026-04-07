import { useState } from 'react';
import './App.css';
import { Task, TodolistItem } from './TodolistItem';
import { v1 } from 'uuid';

export type FilterType = 'all' | 'active' | 'completed';
type TodoList = {
    id: string;
    title: string;
    filter: FilterType;
};

export const App = () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false },
            { id: v1(), title: 'RTK query', isDone: false },
        ],
    });

    const [todolists, setTodolists] = useState<Array<TodoList>>([
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' },
    ]);

    console.log(tasks);
    const deleteTask = (taskId: string, todoListId: string) => {
        const filteredTasks = tasks[todoListId].filter(
            (task) => task.id !== taskId,
        );
        setTasks({ ...tasks, [todoListId]: filteredTasks });
    };

    const createTask = (taskTitle: Task['title'], todoListId: string) => {
        const newTask = { id: v1(), title: taskTitle, isDone: false };
        const updatedTasks = [newTask, ...tasks[todoListId]];
        setTasks({ ...tasks, [todoListId]: updatedTasks });
    };

    const changeStatus = (
        taskId: string,
        isDone: boolean,
        todoListId: string,
    ) => {
        const taskToChangeStatus = tasks[todoListId].map((task) => {
            return task.id === taskId ? { ...task, isDone } : task;
        });
        setTasks({ ...tasks, [todoListId]: taskToChangeStatus });
    };

    const changeFilter = (todoListId: string, filter: FilterType) => {
        const newTodoLists = todolists.map((list) => {
            return list.id === todoListId ? { ...list, filter } : list;
        });
        setTodolists(newTodoLists);
    };

    return (
        <div className='app'>
            {todolists.map((todolist) => {
                const tasksForTodolist = tasks[todolist.id];
                let filteredTasks = tasksForTodolist;
                if (todolist.filter === 'active') {
                    filteredTasks = tasksForTodolist.filter(
                        (task) => !task.isDone,
                    );
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = tasksForTodolist.filter(
                        (task) => task.isDone,
                    );
                }
                return (
                    <TodolistItem
                        key={todolist.id}
                        todoList={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeStatus}
                    />
                );
            })}
        </div>
    );
};
