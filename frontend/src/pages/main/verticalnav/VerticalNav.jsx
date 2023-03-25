import React from 'react';
import './VerticalNav.scss';
import { FaUser } from 'react-icons/fa';

const VerticalNav = () => {
  return (
    <div className="vertical-nav">
      <button>
        <FaUser />
      </button>
    </div>
  );
};

export default VerticalNav;
