export const validateNavigationState = (location, expectedKeys) => {
    if (!location.state || !Object.keys(location.state).every(k => expectedKeys.includes(k))) {
      return { isValid: false, state: null };
    }
    return { isValid: true, state: location.state };
  };