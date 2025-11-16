import ClaimDetailScreen from '../screens/ClaimDetailScreen';
import ClosedClaimsScreen from '../screens/ClosedClaimsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import OpenClaimsScreen from '../screens/OpenClaimsScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import QuickContactsScreen from '../screens/QuickContactsScreen';

export interface RouteConfig {
  name: string;
  component: React.ComponentType<any>;
  title: string;
  icon: string;
}

export const drawerRoutes: RouteConfig[] = [
  {
    name: 'Dashboard',
    component: DashboardScreen,
    title: 'Inicio',
    icon: '🏠',
  },
  {
    name: 'OpenClaims',
    component: OpenClaimsScreen,
    title: 'Reclamos Abiertos',
    icon: '📋',
  },
  {
    name: 'ClosedClaims',
    component: ClosedClaimsScreen,
    title: 'Reclamos Cerrados',
    icon: '✅',
  },
  {
    name: 'ClaimDetail',
    component: ClaimDetailScreen,
    title: 'Detalle del Reclamo',
    icon: '📄',
  },
  {
    name: 'QuickContacts',
    component: QuickContactsScreen,
    title: 'Contactos Rápidos',
    icon: '📞',
  },
  {
    name: 'Feedback',
    component: FeedbackScreen,
    title: 'Feedback',
    icon: '💬',
  },
  {
    name: 'ProfileSettings',
    component: ProfileSettingsScreen,
    title: 'Configuración de Perfil',
    icon: '⚙️',
  },
];

