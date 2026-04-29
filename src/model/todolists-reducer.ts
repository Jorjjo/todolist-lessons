import { v1 } from 'uuid';
import { FilterType, TodoList } from '../App';

export type DeleteTodoListAT = ReturnType<typeof deleteTodoListAC>; //action type
export type CreateTodoListAT = ReturnType<typeof createTodoListAC>;
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>;
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>;

type ActionType =
    | DeleteTodoListAT
    | CreateTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT;

export const todolistsReducer = (
    todolists: TodoList[],
    action: ActionType,
): TodoList[] => {
    switch (action.type) {
        case 'delete_todoList':
            return todolists.filter((list) => list.id !== action.payload.id); // логика удаления тудулиста
        case 'create_todoList':
            const newTodoList: TodoList = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all',
            };
            return [newTodoList, ...todolists];
        case 'change_todoList_title':
            return todolists.map((list) => {
                return list.id === action.payload.id
                    ? { ...list, title: action.payload.title }
                    : list;
            });
        case 'change_todoList_filter':
            const { id, filter } = action.payload;
            return todolists.map((list) => {
                return list.id === id ? { ...list, filter } : list;
            });
        default:
            return todolists;
    }
};

export const deleteTodoListAC = (id: TodoList['id']) =>
    ({
        type: 'delete_todoList',
        payload: { id },
    }) as const; //action creator

export const createTodoListAC = (title: TodoList['title']) =>
    ({
        type: 'create_todoList',
        payload: { title, id: v1() },
    }) as const;

export const changeTodoListTitleAC = (payload: { id: string; title: string }) =>
    ({
        type: 'change_todoList_title',
        payload,
    }) as const;

export const changeTodoListFilterAC = (payload: {
    id: string;
    filter: FilterType;
}) =>
    ({
        type: 'change_todoList_filter',
        payload,
    }) as const;
