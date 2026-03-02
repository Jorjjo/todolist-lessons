import { Task } from './App';
import { Button } from './Button';

type ToDoListProps = {
    title: string;
    tasks: Task[];
    date?: string;
};

export const TodolistItem = ({ title, tasks, date }: ToDoListProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>No Tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type='checkbox' checked={task.isDone} />
                                <span>{task.title}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
            <div>{date}</div>
            <div>
                <Button title='All' />
                <Button title='Active' />
                <Button title='Completed' />
            </div>
        </div>
    );
};
