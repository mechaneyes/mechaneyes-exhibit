// Providing Data from a Root Component
// https://www.digitalocean.com/community/tutorials/how-to-share-state-across-react-components-with-context#step-2-providing-data-from-a-root-component
// 

import { createContext } from 'react';

const AboutContext = createContext(false);
export default AboutContext;