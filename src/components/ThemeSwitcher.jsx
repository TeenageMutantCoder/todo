import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';
import './ThemeSwitcher.css';

const ThemeSwitcher = (props) => {
    const {switchTheme} = props;
    return (
        <div className="ThemeSwitcher height">
            <label className="clickable">
                <input type="checkbox" className="hidden" onChange={switchTheme} />
                <img className='light' src={moonIcon} draggable="false" alt="Switch to dark theme" />
                <img className='dark' src={sunIcon} draggable="false" alt="Switch to light theme" />
            </label>
        </div>
    );
}

export default ThemeSwitcher;