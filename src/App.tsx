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
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    const changeStatus = (taskId: string, isDone: boolean) => {
        const taskToChangeStatus = tasks.map((task) => {
            return task.id === taskId ? { ...task, isDone } : task;
        });
        setTasks(taskToChangeStatus);
    };

    const [todolists, setTodolists] = useState<Array<TodoList>>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ]);

    const changeFilter = (todoListId: string, filter: FilterType) => {
        const newTodoLists = todolists.map((list) => {
            return list.id === todoListId ? { ...list, filter } : list;
        });
        setTodolists(newTodoLists);
    };

    return (
        <div className='app'>
            {todolists.map((todolist) => {
                const getFilteredTasks = () => {
                    let tasksForTodolist = tasks;
                    switch (true) {
                        case todolist.filter === 'active':
                            tasksForTodolist = tasks.filter(
                                (task) => !task.isDone,
                            );
                            break;
                        case todolist.filter === 'completed':
                            tasksForTodolist = tasks.filter(
                                (task) => task.isDone,
                            );
                            break;

                        default:
                            break;
                    }

                    return tasksForTodolist;
                };

                return (
                    <TodolistItem
                        key={todolist.id}
                        todoList={todolist}
                        tasks={getFilteredTasks()}
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
