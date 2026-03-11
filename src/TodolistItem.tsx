import { JSX } from 'react';
import { Button } from './Button';
import { FilterType } from './App';

export type Task = {
    id: number;
    title: string;
    isDone: boolean;
};

type ToDoListProps = {
    title: string;
    tasks: Task[];
    date?: string;
    deleteTask: (taskId: number) => void;
    changeFilter: (filter: FilterType) => void;
};

export const TodolistItem = ({
    title,
    tasks,
    date,
    deleteTask,
    changeFilter,
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

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title='+' onClick={() => {}} />
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
