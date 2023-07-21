import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import { useAuth } from "../../Hooks/useAuth";
function Header() {
  const { user, logout } = useAuth();

  const { cart } = useCart();

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Food mine!
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/profile">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Link to="/cart">
              Cart
              {cart.totalCount > 0 && (
                <span className={classes.cart_count}>{cart.totalCount}</span>
              )}
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
