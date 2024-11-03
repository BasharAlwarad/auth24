import { NavLink } from 'react-router-dom';

const Nav = () => {
  const activeLink = ({ isActive }) =>
    isActive ? 'btn btn-ghost text-primary font-bold' : 'btn btn-ghost';
  return (
    <nav className="navbar bg-base-100 px-4">
      <div className="navbar-start">
        <NavLink to="/" className={activeLink}>
          Home
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/products" className={activeLink}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to="/login" className={activeLink}>
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
