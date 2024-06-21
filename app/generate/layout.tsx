import React, { Suspense, ReactNode } from "react";
import Loading from "./loading";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
