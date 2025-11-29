import { useAuth } from '../context/AuthContext';

export default function useRoleTheme() {
  const { user } = useAuth();
  const role = user?.activeRole || 'Client';
  const isClient = role === 'Client';

  return {
    role,
    isClient,
    textColor: isClient ? 'text-blue-600' : 'text-amber-600',
    hoverText: isClient ? 'hover:text-blue-700' : 'hover:text-amber-700',
    bgCTA: isClient ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-500 hover:bg-amber-600',
    card1Bg: isClient ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800',
    gradientBg: isClient
  ? 'bg-gradient-to-br from-blue-200 via-blue-100 to-blue-500'
  : 'bg-gradient-to-br from-amber-200 via-amber-100 to-amber-500',

  };
}
