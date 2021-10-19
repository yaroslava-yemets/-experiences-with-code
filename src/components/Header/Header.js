import { Link } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => (
    <header className={s.header}>
        <ul className={s.list}>
            <li>
                <Link to="/" exact>Home</Link>
            </li>
            <li>
                <Link to="/aboutUs">Our Servise</Link>
            </li>
            <li>
                <Link to="/regist">Registration</Link>
            </li>
        </ul>
    </header>
);

export default Header;