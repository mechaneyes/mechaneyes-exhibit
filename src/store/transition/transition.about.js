// Providing Data from a Root Component
// https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context#step-2-providing-data-from-a-root-component
// 

import { createContext, useState } from 'react';

const AboutContext = createContext(false);

export const AboutProvider = ({ children }) => {
  const [isIntroVisible, setIntroVisible] = useState(true);
  const [isHamburgerVisible, setHamburgerVisible] = useState(false);

  const toggleHamburger = () => {
    setHamburgerVisible(!isHamburgerVisible);
  };

  return (
    <AboutContext.Provider value={{
      isIntroVisible,
      setIntroVisible,
      isHamburgerVisible,
      setHamburgerVisible,
      toggleHamburger
    }}>
      {children}
    </AboutContext.Provider>
  );
};

export default AboutContext;