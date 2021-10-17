import s from './Header.module.css';

const Header = () => (
    <header className={s.header}>
        <ul className={s.list}>
            <li>Home</li>
            <li>Our Servise</li>
        </ul>
    </header>
);

export default Header;