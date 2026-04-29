import { TasksState } from '../App';
import { CreateTodoListAT, DeleteTodoListAT } from './todolists-reducer';

type ActionType = DeleteTodoListAT | CreateTodoListAT;

export const tasksReducer = (
    tasks: TasksState,
    action: ActionType,
): TasksState => {
    return tasks;
};
