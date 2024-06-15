import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} SpaceX. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
