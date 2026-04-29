import { useReducer, useState } from 'react';
import './App.css';
import { Task, TodolistItem } from './todoListItem/TodolistItem';
import { v1 } from 'uuid';
import { CreateItemForm } from './createItemForm/CreateItemForm';
import {
    AppBar,
    Container,
    createTheme,
    Grid,
    IconButton,
    Paper,
    Stack,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { NavButton } from './NavButton';
import { stackSx } from './App.styled';
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    createTodoListAC,
    deleteTodoListAC,
    todolistsReducer,
} from './model/todolists-reducer';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer,
} from './model/tasks-reducer';

export type FilterType = 'all' | 'active' | 'completed';
export type TodoList = {
    id: string;
    title: string;
    filter: FilterType;
};

// export type TasksState = {
//     [key: string]: Array<Task>;
// };
export type TasksState = Record<string, Array<Task>>;
//Record используется для создания нового типа данных, представляющего объект, где ключи (свойства) имеют определенный тип данных и ассоциированы с другим типом данных.
//type MyRecord = Record<Keys, Values>;
//- Keys - это тип для ключей (свойств) объекта.
//- Values - это тип для значений, соответствующих ключам.

type ThemeMode = 'dark' | 'light';

export const App = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#3f51b5',
            },
            secondary: {
                main: '#d81b60',
            },
        },
        components: {
            MuiIconButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            backgroundColor: 'transparent',
                        },
                    }),
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        '&:hover': {
                            color: theme.palette.secondary.main,
                            backgroundColor: 'transparent',
                        },
                    }),
                },
            },
        },
    });

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    //--------------------------------------------------//
    //BLL
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' },
    ]);

    // const [tasks, setTasks] = useState<TasksState>({
    //     [todoListId1]: [
    //         { id: v1(), title: 'HTML&CSS', isDone: true },
    //         { id: v1(), title: 'JS', isDone: true },
    //         { id: v1(), title: 'ReactJS', isDone: false },
    //     ],
    //     [todoListId2]: [
    //         { id: v1(), title: 'Redux', isDone: false },
    //         { id: v1(), title: 'Typescript', isDone: false },
    //         { id: v1(), title: 'RTK query', isDone: false },
    //     ],
    // });

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

    const deleteTask = (taskId: string, todoListId: string) => {
        dispatchToTasks(deleteTaskAC({ taskId, todoListId }));
        // const filteredTasks = tasks[todoListId].filter(
        //     (task) => task.id !== taskId,
        // );
        // setTasks({ ...tasks, [todoListId]: filteredTasks });
    };

    const createTask = (taskTitle: Task['title'], todoListId: string) => {
        dispatchToTasks(createTaskAC({ taskTitle, todoListId }));
        // const newTask: Task = { id: v1(), title: taskTitle, isDone: false };
        // const updatedTasks = [newTask, ...tasks[todoListId]];
        // setTasks({ ...tasks, [todoListId]: updatedTasks });
    };

    const changeStatus = (
        taskId: string,
        isDone: boolean,
        todoListId: string,
    ) => {
        dispatchToTasks(changeTaskStatusAC({ taskId, isDone, todoListId }));
        // const taskToChangeStatus = tasks[todoListId].map((task) => {
        //     return task.id === taskId ? { ...task, isDone } : task;
        // });

        // setTasks({ ...tasks, [todoListId]: taskToChangeStatus });
    };

    const changeTaskTitle = (
        todoListId: string,
        taskId: string,
        title: string,
    ) => {
        dispatchToTasks(changeTaskTitleAC({ todoListId, taskId, title }));
        // const taskToChangeTitle = tasks[todoListId].map((task) => {
        //     return task.id === taskId ? { ...task, title } : task;
        // });

        // setTasks({ ...tasks, [todoListId]: taskToChangeTitle });
    };

    //TodoList
    const createTodolist = (title: string) => {
        const action = createTodoListAC(title);
        dispatchToTodolists(action);
        dispatchToTasks(action);
        // setTasks({ ...tasks, [action.payload.id]: [] });
    };

    const deleteTodoList = (todoListId: string) => {
        const action = deleteTodoListAC(todoListId);
        dispatchToTodolists(action);
        dispatchToTasks(action);
        // delete tasks[todoListId];
        // setTasks({ ...tasks });
    };
    //The delete operator removes a property from an object.
    //delete object.property
    //delete object[property]

    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatchToTodolists(changeTodoListTitleAC({ id: todoListId, title }));
    };

    const changeFilter = (todoListId: string, filter: FilterType) => {
        dispatchToTodolists(changeTodoListFilterAC({ id: todoListId, filter }));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                sx={{
                    mb: '20px',
                }}
                position='sticky'
                elevation={themeMode === 'light' ? 0 : 4}
            >
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton color='inherit'>
                            <MenuOutlinedIcon />
                        </IconButton>
                        <div>
                            <NavButton
                                variant='contained'
                                disableElevation
                                color='secondary'
                            >
                                Sign in
                            </NavButton>
                            <NavButton
                                variant='contained'
                                disableElevation
                                color='secondary'
                            >
                                Sign up
                            </NavButton>
                            <NavButton color='inherit' border={'none'}>
                                Faq
                            </NavButton>
                            <Switch color={'default'} onChange={changeMode} />
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Stack spacing={3} sx={stackSx}>
                    <Typography color='primary' variant='h4' component='h2'>
                        Create new To-do List
                    </Typography>
                    <CreateItemForm
                        createItem={createTodolist}
                        maxTitleLength={30}
                    />
                </Stack>
                <Grid
                    container
                    spacing={4}
                    sx={{
                        justifyContent: 'space-evenly',
                    }}
                >
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
                            <Grid key={todolist.id}>
                                <Paper
                                    elevation={themeMode === 'light' ? 0 : 4}
                                    sx={stackSx}
                                >
                                    <TodolistItem
                                        todoList={todolist}
                                        tasks={filteredTasks}
                                        deleteTask={deleteTask}
                                        changeFilter={changeFilter}
                                        createTask={createTask}
                                        changeTaskStatus={changeStatus}
                                        deleteTodoList={deleteTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={
                                            changeTodoListTitle
                                        }
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};
