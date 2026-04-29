import { beforeEach, expect, test } from 'vitest';
import type { TasksState } from '../App';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer,
} from './tasks-reducer';
import { createTodoListAC, deleteTodoListAC } from './todolists-reducer';

let startState: TasksState = {};

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    };
});

//tasks for new todolist
test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodoListAC('New todolist'));

    const keys = Object.keys(endState);
    const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error('New key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

//delete tasks after todolist deleted
test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodoListAC('todolistId2'));
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
    // or
    expect(endState['todolistId2']).toBeUndefined();
});

//new task
test('correct task should be created at correct array', () => {
    const taskTitle = 'juice';
    const endState = tasksReducer(
        startState,
        createTaskAC({
            taskTitle,
            todoListId: 'todolistId2',
        }),
    );

    expect(endState.todolistId1.length).toBe(3);
    expect(endState.todolistId2.length).toBe(4);
    expect(endState.todolistId2[0].id).toBeDefined();
    expect(endState.todolistId2[0].title).toBe('juice');
    expect(endState.todolistId2[0].isDone).toBe(false);
});

//task change status
test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({
            todoListId: 'todolistId2',
            taskId: '2',
            isDone: false,
        }),
    );

    expect(endState.todolistId2[0].isDone).toBe(false);
    expect(endState.todolistId2[1].isDone).toBe(false);
});

//delete task
test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ todoListId: 'todolistId2', taskId: '2' }),
    );

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false },
        ],
    });
});

// task change title - for review?
test('correct task should change its title', () => {
    const newTitle = 'water';
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({
            todoListId: 'todolistId2',
            taskId: '2',
            title: newTitle,
        }),
    );

    expect(endState.todolistId2[0].title).toBe('bread');
    expect(endState.todolistId1[1].title).toBe('JS');
    expect(endState.todolistId2[1].title).toBe('water');
});
