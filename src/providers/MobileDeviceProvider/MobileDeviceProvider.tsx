'use client';

import React from 'react';

type MobileDeviceContextType = {
  isMobileDevice: boolean;
};

export const MobileDeviceContext = React.createContext<MobileDeviceContextType>(
  {
    isMobileDevice: false,
  },
);

type MobileDeviceProviderProps = React.PropsWithChildren<{
  isMobileDevice: boolean;
}>;

export const MobileDeviceProvider = ({
  children,
  isMobileDevice,
}: MobileDeviceProviderProps) => {
  return (
    <MobileDeviceContext.Provider value={{ isMobileDevice }}>
      {children}
    </MobileDeviceContext.Provider>
  );
};
