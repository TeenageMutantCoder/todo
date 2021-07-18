import './Todo.css';

const Todo = (props) => {
    const { id, text, isCompleted, deleteTodo, editTodo, moveTodo } = props;
    // Drag-and-drop event handlers
    const onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const onDrag = (e) => {
        e.target.style.opacity = 0.3;
    };

    const onDragEnd = (e) => {
        e.target.style.opacity = 1;
    };

    const onDrop = (e) => {
        const id1 = parseInt(e.dataTransfer.getData('text/plain'));
        const id2 = parseInt(e.target.dataset.id);
        if (isNaN(id1) || isNaN(id2)) return;
        moveTodo(id1, id2);
        e.preventDefault();
    };

    const onDragEnter = (e) => {
        e.preventDefault();
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    // // Touch event handlers
    // const onTouchStart = (e) => {
    //     e.preventDefault();
    //     console.log(e.changedTouches);
    //     console.log(e.targetTouches);
    //     console.log(e.target);
    // };
    // const onTouchMove = (e) => {
    //     e.preventDefault();
    // };
    // const onTouchEnd = (e) => {
    //     e.preventDefault();
    // };
    window.ontouchmove = () => {};
    return (
        <>
        <div className="Todo flex-sb-c height pd-x" data-id={id} draggable="true" onDragOver={onDragOver} 
             onDragStart={onDragStart} onDrag={onDrag} onDragEnd={onDragEnd} onDrop={onDrop} onDragEnter={onDragEnter}>
            <label className="flex extend">
                <input type="checkbox" className="hidden" name="todoCompleted" checked={isCompleted} 
                       onChange={(e) => editTodo(id, e.target.checked)} />
                <span className="checkbox clickable" data-id={id}></span>
                <span className="mg-x todo-text extend clickable" data-id={id}>{text}</span>
            </label>
            <button type="button" className="hidden clickable no-bg-bd bg-center-no-re" onClick={(e) => deleteTodo(id)}></button>
        </div>
        <hr data-id={id} onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop} />
        </>
    );
}

export default Todo;