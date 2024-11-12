import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../contexts/userContext';

const Nav = () => {
  const { user } = useAuthContext(); // Get the user from context
  const activeLink = ({ isActive }) =>
    isActive ? 'btn btn-ghost text-primary font-bold' : 'btn btn-ghost';

  return (
    <nav className="px-4 navbar bg-base-100">
      <div className="navbar-start">
        <NavLink to="/" className={activeLink}>
          🧩 Travel journal
        </NavLink>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <NavLink to="/posts" className={activeLink}>
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={activeLink}>
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          // If the user is logged in, show the Logout button
          <NavLink to="/logout" className={activeLink}>
            Logout
          </NavLink>
        ) : (
          // If the user is not logged in, show the Login button
          <NavLink to="/login" className={activeLink}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;

// import { NavLink } from 'react-router-dom';

// const Nav = () => {
//   const activeLink = ({ isActive }) =>
//     isActive ? 'btn btn-ghost text-primary font-bold' : 'btn btn-ghost';
//   return (
//     <nav className="px-4 navbar bg-base-100">
//       <div className="navbar-start">
//         <NavLink to="/" className={activeLink}>
//           🧩 Travel journal
//         </NavLink>
//       </div>
//       <div className="hidden navbar-center lg:flex">
//         <ul className="px-1 menu menu-horizontal">
//           <li>
//             <NavLink to="/posts" className={activeLink}>
//               Posts
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/users" className={activeLink}>
//               Users
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       <div className="navbar-end">
//         <NavLink to="/login" className={activeLink}>
//           Login
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Nav;
