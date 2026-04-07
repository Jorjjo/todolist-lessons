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
    todoList: { id: string; title: string; filter: string };
    tasks: Task[];
    date?: string;
    deleteTask: (taskId: Task['id'], todoListId: string) => void;
    changeFilter: (todoListId: string, filter: FilterType) => void;
    createTask: (taskTitle: Task['title'], todoListId: string) => void;
    changeTaskStatus: (
        taskId: Task['id'],
        isDone: boolean,
        todoListId: string,
    ) => void;
};

export const TodolistItem = ({
    todoList,
    tasks,
    date,
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
                        deleteTask(task.id, todoList.id);
                    };
                    const handleOnChange = (
                        event: ChangeEvent<HTMLInputElement>,
                    ) => {
                        changeTaskStatus(
                            task.id,
                            event.currentTarget.checked,
                            todoList.id,
                        );
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
                createTask(taskTitle.trim(), todoList.id);
                setTaskTitle('');
                break;
        }
    };

    const handleChangeFilter = (filter: FilterType) => {
        changeFilter(todoList.id, filter);
    };

    return (
        <div>
            <h3>{todoList.title}</h3>
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
                    className={
                        todoList.filter === 'all' ? 'btn-filter-active' : ''
                    }
                    title='All'
                    onClick={() => {
                        handleChangeFilter('all');
                    }}
                />
                <Button
                    className={
                        todoList.filter === 'active' ? 'btn-filter-active' : ''
                    }
                    title='Active'
                    onClick={() => {
                        handleChangeFilter('active');
                    }}
                />
                <Button
                    className={
                        todoList.filter === 'completed'
                            ? 'btn-filter-active'
                            : ''
                    }
                    title='Completed'
                    onClick={() => {
                        handleChangeFilter('completed');
                    }}
                />
            </div>
        </div>
    );
};
