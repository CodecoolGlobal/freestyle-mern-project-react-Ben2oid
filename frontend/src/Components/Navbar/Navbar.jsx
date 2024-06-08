import { Link } from "react-router-dom";

import "./style.scss";
import { useAuth } from "../../Hooks";

export function NavBar() {
  const { isItLoggedIn, user } = useAuth();

  return (
    <div>
      <ul className="navbar-container">
        <li>
          <Link to="/newsfeed">News Feed</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          <Link to="/my-list">My list</Link>
        </li>
        {!isItLoggedIn ? (
          <li>
            <Link to="/auth">Sign in</Link>
          </li>
        ) : (
          <li>
            <Link to={`/profile/${user.userId}`}>Profile</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
