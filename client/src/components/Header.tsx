// import React from "react";
// import CartPanel from "./CartPanel";
// import type { Product } from "../types/types";
// import { ThemeContext } from "../providers/ThemeProvider";

// interface HeaderProps {
//   cart: Product[];
//   onCheckout: () => void;
// }

// const colorThemes = {
//   light: 'light gray',
//   dark: 'dark gray',
// }

// const Header = ({ cart, onCheckout }: HeaderProps) => {
//   const themeContext = React.useContext(ThemeContext)
//   const {theme, handleThemeChange} = themeContext;

//   const toggleTheme = () => {
//     handleThemeChange(theme === 'light' ? 'dark' : 'light')
//   }
//   console.log(themeContext)
//   return (
//     <header>
//       <h1>The Shop!</h1>
//       <div className="cart">
//         <h2>Your Cart</h2>
//         <CartPanel cart={cart} onCheckout={onCheckout} />
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import CartPanel from "./CartPanel";
import type { Product } from "../types/types";
import { ThemeContext } from "../providers/ThemeProvider";

interface HeaderProps {
  cart: Product[];
  onCheckout: () => void;
}

const Header = ({ cart, onCheckout }: HeaderProps) => {
  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, handleThemeChange } = themeContext;

    const toggleTheme = () => {
    handleThemeChange(theme === 'light' ? 'dark' : 'light')
  }
  console.log(theme);

  return (
    <header
  style={{
    backgroundColor: theme === "light" ? "" : "rgb(39, 39, 39)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'normal',
    padding: "20px",
    borderRadius: "4px",
  }}
>
      <h1>The Shop!</h1>
      <button style={{display:'contents', alignItems:'normal'}} className="button" onClick={toggleTheme}>
        Mode {theme === "light" ? "🌙" : "🌞"}
      </button>
      <div className="cart">
        <h2>Your Cart</h2>
        <CartPanel cart={cart} onCheckout={onCheckout} />
      </div>
    </header>
  );
};

export default Header;