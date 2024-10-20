import { Link } from 'react-router-dom';
import './Home.css'; // Importing CSS for styling

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Welcome to Task Manager</h1>
                <div className="home-buttons">
                    <Link to="/login" className="btn btn-login">Login</Link>
                    <Link to="/signup" className="btn btn-signup">Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
