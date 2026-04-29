import { v1 } from 'uuid';
import { TasksState } from '../App';
import { Task } from '../todoListItem/TodolistItem';
import { CreateTodoListAT, DeleteTodoListAT } from './todolists-reducer';

export type createTaskAT = ReturnType<typeof createTaskAC>;
export type deleteTaskAT = ReturnType<typeof deleteTaskAC>;
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;

type ActionType =
    | DeleteTodoListAT
    | CreateTodoListAT
    | createTaskAT
    | deleteTaskAT
    | changeTaskTitleAT
    | changeTaskStatusAT;

export const tasksReducer = (
    tasks: TasksState,
    action: ActionType,
): TasksState => {
    switch (action.type) {
        case 'delete_todoList':
            const copyTasksState = { ...tasks };
            delete copyTasksState[action.payload.id];
            return copyTasksState;
        case 'create_todoList':
            return { ...tasks, [action.payload.id]: [] };
        case 'create_task':
            const { taskTitle, todoListId, id } = action.payload;
            const newTask: Task = { id, title: taskTitle, isDone: false };
            return { ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] };
        case 'delete_task':
            const filteredTasks = tasks[action.payload.todoListId].filter(
                (task) => task.id !== action.payload.taskId,
            );
            return { ...tasks, [action.payload.todoListId]: filteredTasks };
        case 'change_task_status': {
            const { todoListId, taskId, isDone } = action.payload;
            return {
                ...tasks,
                [todoListId]: tasks[todoListId].map((task) => {
                    return task.id === taskId ? { ...task, isDone } : task;
                }),
            };
        }
        case 'change_task_title': {
            const { todoListId, taskId, title } = action.payload;
            return {
                ...tasks,
                [todoListId]: tasks[todoListId].map((task) => {
                    return task.id === taskId ? { ...task, title } : task;
                }),
            };
        }
        default:
            return tasks;
    }
};

export const createTaskAC = ({
    taskTitle,
    todoListId,
}: {
    taskTitle: string;
    todoListId: string;
}) =>
    ({
        type: 'create_task',
        payload: { taskTitle, todoListId, id: v1() },
    }) as const;

export const deleteTaskAC = (payload: { taskId: string; todoListId: string }) =>
    ({
        type: 'delete_task',
        payload,
    }) as const;

export const changeTaskStatusAC = (payload: {
    taskId: string;
    isDone: boolean;
    todoListId: string;
}) =>
    ({
        type: 'change_task_status',
        payload,
    }) as const;

export const changeTaskTitleAC = (payload: {
    todoListId: string;
    taskId: string;
    title: string;
}) =>
    ({
        type: 'change_task_title',
        payload,
    }) as const;
