import './Navigation.css';

const Navigation = (props) => {
    const { updateFilter, todosFilter, classes, id } = props;
    return (
        <nav className={`Navigation flex extend ${classes? classes: ''}`} >
            <label className="clickable mg-x bold text">
              <input type="radio" className="hidden" name={`todos${id? id: ''}`} value="all" checked={todosFilter === 'all'} 
                     onChange={updateFilter} />
              <span>All</span>
            </label>
            <label className="clickable mg-x bold text">
              <input type="radio" className="hidden" name={`todos${id? id: ''}`} value="active" checked={todosFilter === 'active'}
                     onChange={updateFilter} />
              <span>Active</span>
            </label>
            <label className="clickable mg-x bold text">
              <input type="radio" className="hidden" name={`todos${id? id: ''}`} value="completed" checked={todosFilter === 'completed'}
                     onChange={updateFilter} />
              <span>Completed</span>
            </label> 
        </nav>
    );
}

export default Navigation;