import { JSX, useState } from 'react';
import { Button } from './Button';
import { FilterType } from './App';
import { Input } from './Input';

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

type ToDoListProps = {
    title: string;
    tasks: Task[];
    date?: string;
    deleteTask: (taskId: Task['id']) => void;
    changeFilter: (filter: FilterType) => void;
    createTask: (taskTitle: Task['title']) => void;
};

export const TodolistItem = ({
    title,
    tasks,
    date,
    deleteTask,
    changeFilter,
    createTask,
}: ToDoListProps) => {
    const tasksList: JSX.Element =
        tasks.length === 0 ? (
            <p>No Tasks</p>
        ) : (
            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type='checkbox' checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button
                                title='x'
                                onClick={() => deleteTask(task.id)}
                            />
                        </li>
                    );
                })}
            </ul>
        );

    const [taskTitle, setTaskTitle] = useState('');

    const handleCreateTask = () => {
        createTask(taskTitle);
        setTaskTitle('');
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input
                    taskTitle={taskTitle}
                    onChange={setTaskTitle}
                    onEnter={handleCreateTask}
                />
                <Button
                    title='+'
                    isDisabled={taskTitle.trim() === ''}
                    onClick={() => {
                        handleCreateTask();
                    }}
                />
            </div>
            {tasksList}
            <div>{date}</div>
            <div>
                <Button
                    title='All'
                    onClick={() => {
                        changeFilter('all');
                    }}
                />
                <Button
                    title='Active'
                    onClick={() => {
                        changeFilter('active');
                    }}
                />
                <Button
                    title='Completed'
                    onClick={() => {
                        changeFilter('completed');
                    }}
                />
            </div>
        </div>
    );
};
