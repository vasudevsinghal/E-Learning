// import { ReactComponent as GoldBadge } from '../../Assets/Images/gold.svg';
// import { ReactComponent as SilverBadge } from '../../Assets/Images/silver.svg';
// import { ReactComponent as BronzeBadge } from '../../Assets/Images/bronze.svg';
import GoldBadge from '../../Assets/Images/gold.png';
import SilverBadge from '../../Assets/Images/silver.png';
import BronzeBadge from '../../Assets/Images/bronze.png';
const Badge = (props) => {
  const badgeStyle = { width: '20px', height: 'auto' };

  return props.badgeName === 'gold' ? (
    <img src={GoldBadge} style={badgeStyle} />
  ) : props.badgeName === 'silver' ? (
    <img src={SilverBadge} style={badgeStyle} />
  ) : (
    <img src={BronzeBadge} style={badgeStyle} />
  );
};
export default Badge;
