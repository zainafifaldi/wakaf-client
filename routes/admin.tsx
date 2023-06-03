// import
import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import { FaHome, FaUsers, FaUser } from 'react-icons/fa';

var Routes = [
  {
    path: '',
    name: 'Dashboard',
    icon: FaHome,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'Users',
    icon: FaUsers,
    layout: '/admin',
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/account",
        name: "Profile",
        icon: FaUser,
        secondaryNavbar: true,
        layout: '/admin',
      },
    ],
  },
];
export default Routes;
