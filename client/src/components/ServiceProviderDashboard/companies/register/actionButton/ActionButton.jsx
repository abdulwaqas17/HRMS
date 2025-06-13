import React from 'react';
// import PropTypes from 'prop-types';

 const ActionButton = ({ 
  icon, 
  onClick, 
  tooltip, 
  danger = false,
  success = false,
  disabled = false 
}) => {
  const colorClasses = danger 
    ? 'text-red-600 hover:bg-red-50' 
    : success 
      ? 'text-green-600 hover:bg-green-50' 
      : 'text-gray-600 hover:bg-gray-100';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-full transition ${colorClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={tooltip}
    >
      {icon}
    </button>
  );
};

// ActionButton.propTypes = {
//   icon: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired,
//   tooltip: PropTypes.string,
//   danger: PropTypes.bool,
//   success: PropTypes.bool,
//   disabled: PropTypes.bool
// };

export default ActionButton;