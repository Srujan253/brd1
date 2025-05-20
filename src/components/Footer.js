import React from "react";

function Footer() {
  return (
    <footer className="bg-amber-400 text-center py--2 mt-8 font-sans">
       <p className="text-center text-sm text-gray-500 mt-10">
  © {new Date().getFullYear()} Srujan H M. All rights reserved.
</p>
    </footer>
  );
}

export default Footer;