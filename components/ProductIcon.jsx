import React from 'react';
import { FaBox, FaCog, FaWater, FaLeaf, FaTools } from 'react-icons/fa';

// Component to render product icons dynamically based on icon name
const ProductIcon = ({ iconName }) => {
  const iconMap = {
    FaBox: FaBox,
    FaCog: FaCog,
    FaWater: FaWater,
    FaLeaf: FaLeaf,
    FaTools: FaTools
  };

  const IconComponent = iconMap[iconName] || FaCog;
  
  return <IconComponent />;
};

export default ProductIcon;

