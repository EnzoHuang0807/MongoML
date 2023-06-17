import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import { Link, useLocation } from 'react-router-dom';
import { useMessage } from '../hooks/useMessage';

const items = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    to: '/',
  },
  {
    name: 'Data Exploration',
    icon: <LeaderboardIcon />,
    to: '/data_exploration',
  },
  {
    name: 'Machine Learning',
    icon: <InsightsIcon />,
    to: '/ML',
  },
];

function SideBarItems() {
  const location = useLocation();
  const currentPath = location.pathname;

  const { removeMessage } = useMessage();

  const handleClear = async () => {
    removeMessage();
  };

  return (
    <>
      {
        items.map((item) => (
          <ListItemButton
            key={item.name}
            component={Link}
            to={item.to}
            selected={currentPath === item.to}
            onClick={handleClear}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))
      }
    </>
  );
}

export default SideBarItems;
