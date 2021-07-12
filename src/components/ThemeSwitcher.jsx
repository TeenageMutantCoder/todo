import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
    return (
        <div className="ThemeSwitcher height">
            <label className="clickable">
                <input type="checkbox" className="hidden" />
                <img src={moonIcon} alt="Switch to dark theme" />
                <img src={sunIcon} alt="Switch to light theme" />
            </label>
        </div>
    );
}

export default ThemeSwitcher;