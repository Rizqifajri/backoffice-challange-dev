'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  // Create a client
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Adjust these settings as needed
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;