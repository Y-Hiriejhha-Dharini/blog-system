import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header>
            <div>
            <h1>Hi</h1>
                <Link to="/login" key="login">Login</Link>
            </div>
        </header>
     );
}
 
export default Header;