import { ChangeEvent, JSX } from 'react';
import { Button } from './Button';
import { FilterType, TodoList } from './App';
import { CreateItemForm } from './CreateItemForm';
import { EditableSpan } from './EditableSpan';

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

type ToDoListProps = {
    todoList: TodoList;
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
    deleteTodoList: (todoListId: string) => void;
    changeTaskTitle: (
        todoListId: string,
        taskId: string,
        title: string,
    ) => void;
    changeTodoListTitle: (todoListId: string, title: string) => void;
};

export const TodolistItem = ({
    todoList,
    tasks,
    date,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodoList,
    changeTaskTitle,
    changeTodoListTitle,
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
                    const handleChangeTaskTitle = (title: string) => {
                        changeTaskTitle(todoList.id, task.id, title);
                    };
                    return (
                        <li key={task.id}>
                            <input
                                type='checkbox'
                                onChange={handleOnChange}
                                checked={task.isDone}
                            />
                            <EditableSpan
                                status={task.isDone}
                                value={task.title}
                                onTitleChange={handleChangeTaskTitle}
                                maxTitleLength={15}
                            />
                            <Button title='x' onClick={handleOnClick} />
                        </li>
                    );
                })}
            </ul>
        );

    const handleChangeFilter = (filter: FilterType) => {
        changeFilter(todoList.id, filter);
    };
    const handleDeleteList = (todoListId: string) => {
        deleteTodoList(todoListId);
    };

    const handleCreateTask = (title: string) => {
        createTask(title, todoList.id);
    };
    
    const handleTodoListTitleChange = (title: string) => {
        changeTodoListTitle(todoList.id, title);
    };

    return (
        <div>
            <div className='container'>
                <EditableSpan
                    value={todoList.title}
                    onTitleChange={handleTodoListTitleChange}
                    maxTitleLength={30}
                />
                <Button
                    title='X'
                    onClick={() => {
                        handleDeleteList(todoList.id);
                    }}
                />
            </div>
            <CreateItemForm сreateItem={handleCreateTask} maxTitleLength={15} />
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
