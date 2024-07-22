// lib/auth.js
import { getSession } from 'next-auth/react';

export function withRole(allowedRoles, redirectPath) {
  return async (context) => {
    const session = await getSession(context);
    
    if (!session) {
      return {
        redirect: {
          destination: redirectPath,
          permanent: false,
        },
      };
    }

    const userRole = session.user.role;

    if (!allowedRoles.includes(userRole)) {
      return {
        redirect: {
          destination: redirectPath,
          permanent: false,
        },
      };
    }

    return {
      props: { session },
    };
  };
}
