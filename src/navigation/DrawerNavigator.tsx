import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import MenuButton from '../components/MenuButton';
import { COLORS } from '../constants/theme';
import { drawerRoutes } from './routes.config';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: COLORS.primary,
          elevation: 2,
          shadowOpacity: 0.1,
        },
        headerTitle: '',
        headerLeft: () => null,
        headerRight: () => <MenuButton navigation={navigation} />,
        drawerPosition: 'left',
      })}
    >
      {drawerRoutes.map((route) => (
        <Drawer.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{ title: route.title }}
        />
      ))}
    </Drawer.Navigator>
  );
}

