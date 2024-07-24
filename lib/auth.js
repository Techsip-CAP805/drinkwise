// lib/auth.js

// import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { authOptions } from './authOptions';

export function withRole(allowedRoles, redirectPath) {
  return async (context) => {
    // const session = await getSession(context);
    const session = await getServerSession(context.req, context.res, authOptions);
    
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
