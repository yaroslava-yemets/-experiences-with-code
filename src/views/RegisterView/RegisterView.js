import { useState } from 'react';
import './RegisterView.css';

const RegisterView = () => {
    const [isPanelActive, setIsPanelActive] = useState(true);

    const handleOnClick = () => {
        setIsPanelActive(state => !state);
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
    <div className={`container${isPanelActive && " right-panel-active"}`}>
        {/* Sign Up */}
        <div className="container__form container--signup">
            <form action="#" className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Sign Up</h2>
                <input type="text" placeholder="User" className="input" />
                <input type="email" placeholder="Email" className="input" />
                <input type="password" placeholder="Password" className="input" />
                <button className="btn">Sign Up</button>
            </form>
        </div>

        {/* Sign In */}
        <div className="container__form container--signin">
            <form action="#" className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Sign In</h2>
                <input type="email" placeholder="Email" className="input" />
                <input type="password" placeholder="Password" className="input" />
                <a href="#" className="link">Forgot your password?</a>
                <button className="btn">Sign In</button>
            </form>
        </div>

        {/* Overlay */}
        <div className="container__overlay">
            <div className="overlay">
                <div className="overlay__panel overlay--left">
                    <button className="btn" onClick={handleOnClick}>Sign In</button>
                </div>
                <div className="overlay__panel overlay--right">
                    <button className="btn" onClick={handleOnClick}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default RegisterView;