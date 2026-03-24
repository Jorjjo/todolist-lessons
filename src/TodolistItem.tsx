import { ChangeEvent, JSX, useState } from 'react';
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
    filter: FilterType;
    deleteTask: (taskId: Task['id']) => void;
    changeFilter: (filter: FilterType) => void;
    createTask: (taskTitle: Task['title']) => void;
    changeTaskStatus: (taskId: Task['id'], isDone: boolean) => void;
};

export const TodolistItem = ({
    title,
    tasks,
    date,
    filter,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
}: ToDoListProps) => {
    const tasksList: JSX.Element =
        tasks.length === 0 ? (
            <p>No Tasks</p>
        ) : (
            <ul>
                {tasks.map((task) => {
                    const handleOnClick = () => {
                        deleteTask(task.id);
                    };
                    const handleOnChange = (
                        event: ChangeEvent<HTMLInputElement>,
                    ) => {
                        changeTaskStatus(task.id, event.currentTarget.checked);
                    };
                    return (
                        <li key={task.id}>
                            <input
                                type='checkbox'
                                onChange={handleOnChange}
                                checked={task.isDone}
                            />
                            <span
                                className={task.isDone ? 'task-done' : 'task'}
                            >
                                {task.title}
                            </span>
                            <Button title='x' onClick={handleOnClick} />
                        </li>
                    );
                })}
            </ul>
        );

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const maxTitleLength = 15;
    const isTitleLengthValid = taskTitle.length <= maxTitleLength;

    const handleCreateTask = () => {
        switch (true) {
            case taskTitle.trim() === '':
                setError('Title is required');
                break;
            case !isTitleLengthValid:
                setError('Title is too long');
                break;
            default:
                createTask(taskTitle.trim());
                setTaskTitle('');
                break;
        }
        // if (taskTitle.trim() !== '' && isTitleLengthValid) {
        //     createTask(taskTitle.trim());
        //     setTaskTitle('');
        // }
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input
                    className={error ? 'error' : ''}
                    taskTitle={taskTitle}
                    onChange={setTaskTitle}
                    onEnter={handleCreateTask}
                    setError={setError}
                />
                <Button
                    title='+'
                    isDisabled={taskTitle === ''}
                    onClick={() => {
                        handleCreateTask();
                    }}
                />
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasksList}
            <div>{date}</div>
            <div>
                <Button
                    className={filter === 'all' ? 'btn-filter-active' : ''}
                    title='All'
                    onClick={() => {
                        changeFilter('all');
                    }}
                />
                <Button
                    className={filter === 'active' ? 'btn-filter-active' : ''}
                    title='Active'
                    onClick={() => {
                        changeFilter('active');
                    }}
                />
                <Button
                    className={
                        filter === 'completed' ? 'btn-filter-active' : ''
                    }
                    title='Completed'
                    onClick={() => {
                        changeFilter('completed');
                    }}
                />
            </div>
        </div>
    );
};
