import React, { useState } from "react";

const Header = () => {
  const [greeting, setGreeting] = useState("Hello Function Component!");
  return (
    <div>
      <h1>{greeting}</h1>
      <input
        type="text"
        value={greeting}
        onChange={event => setGreeting(event.target.value)}
      />
    </div>
  );
};
export default Header;
