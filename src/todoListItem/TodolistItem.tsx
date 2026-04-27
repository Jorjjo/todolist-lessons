import { ChangeEvent, JSX } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { FilterType, TodoList } from '../App';
import { CreateItemForm } from '../createItemForm/CreateItemForm';
import { EditableSpan } from '../EditableSpan';
import { Box, Checkbox, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { containerSx, getListItemSx } from './TodolistItem.styles';

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
            <Typography sx={{ m: '20px' }}>No Tasks</Typography>
        ) : (
            <List>
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
                        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                            <div>
                                <Checkbox
                                    size='small'
                                    onChange={handleOnChange}
                                    checked={task.isDone}
                                />
                                <EditableSpan
                                    value={task.title}
                                    onTitleChange={handleChangeTaskTitle}
                                    maxTitleLength={15}
                                />
                            </div>
                            <IconButton color='primary' onClick={handleOnClick}>
                                <DeleteOutlinedIcon
                                    fontSize='small'
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'none',
                                        },
                                    }}
                                />
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
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

    const handleTodoListTitleChange = (title: any) => {
        changeTodoListTitle(todoList.id, title);
    };

    return (
        <div>
            <Box sx={{ mb: '20px' }}>
                <EditableSpan
                    value={todoList.title}
                    onTitleChange={handleTodoListTitleChange}
                    maxTitleLength={30}
                />
                <IconButton
                color='primary'
                    onClick={() => {
                        handleDeleteList(todoList.id);
                    }}
                >
                    <DeleteOutlinedIcon fontSize='small' />
                </IconButton>
            </Box>
            <CreateItemForm createItem={handleCreateTask} maxTitleLength={15} />
            {tasksList}
            <div>{date}</div>
            <Box sx={containerSx}>
                <Button
                    variant={todoList.filter === 'all' ? 'outlined' : 'text'}
                    size='small'
                    color={'inherit'}
                    onClick={() => {
                        handleChangeFilter('all');
                    }}
                >
                    All
                </Button>
                <Button
                    variant={todoList.filter === 'active' ? 'outlined' : 'text'}
                    size='small'
                    color={'primary'}
                    onClick={() => {
                        handleChangeFilter('active');
                    }}
                >
                    Active
                </Button>
                <Button
                    variant={
                        todoList.filter === 'completed' ? 'outlined' : 'text'
                    }
                    size='small'
                    color={'secondary'}
                    onClick={() => {
                        handleChangeFilter('completed');
                    }}
                >
                    Completed
                </Button>
            </Box>
        </div>
    );
};
