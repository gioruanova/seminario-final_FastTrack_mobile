import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import Footer from '../footer/Footer';

interface ScreenLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
}

export default function ScreenLayout({ children, style, scrollable = true }: ScreenLayoutProps) {
  const backgroundImage = require('../../../assets/images/bg-mobile.jpg');

  if (!scrollable) {
    return (
      <ImageBackground source={backgroundImage} style={[styles.container, style]} resizeMode="cover">
        <View style={styles.content}>
          {children}
        </View>
        <Footer />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={[styles.container, style]} resizeMode="cover">
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          {children}
        </View>
        <Footer />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 8,
  },
});

