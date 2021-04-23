import React from 'react';
import OnboardingScreenLayout from '../layouts/OnboardingScreen-Layout/OnboardingScreen-Layout';

const OnboardingScreenTemplate = ({route}) => {
  console.log(route.params);
  return <OnboardingScreenLayout />;
};

export default OnboardingScreenTemplate;
