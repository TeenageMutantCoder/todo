import './Todo.css';
import { useRef } from 'react';

const NewTodo = (props) => {
    const { addTodo } = props;
    const checkboxRef = useRef();
    const onKey = (e) => {
        if (e.key === 'Enter') {
            const isCompleted = checkboxRef.current.checked;
            const text =  e.target.value;
            if (text === '') return;
            addTodo(text, isCompleted);
            e.target.value = '';
            checkboxRef.current.checked = false;
        }
    };

    return (
        <div className="NewTodo Todo flex height pd-x">
            <label>
                <input ref={checkboxRef} type="checkbox" className="hidden" name="todoCompleted" />
                <span className="clickable checkbox"></span>
            </label>
            <input onKeyDown={onKey} type="text" className="mg-x no-bg-bd extend" placeholder="Create a new todo..." />
        </div>
    );
}

export default NewTodo;