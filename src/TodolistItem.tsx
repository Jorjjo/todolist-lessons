import { JSX } from 'react';
import { TaskProps } from './App';
import { Button } from './Button';

type ToDoListProps = {
    title: string;
    tasks: TaskProps[];
    date?: string;
};

export const TodolistItem = ({ title, tasks, date }: ToDoListProps) => {
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
                        </li>
                    );
                })}
            </ul>
        );
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title='+'/>
            </div>
            {tasksList}
            <div>{date}</div>
            <div>
                <Button title='All' />
                <Button title='Active' />
                <Button title='Completed' />
            </div>
        </div>
    );
};
