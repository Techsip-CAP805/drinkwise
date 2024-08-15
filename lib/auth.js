// lib/auth.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export function withRole(allowedRoles, redirectPath) {
  return async (context) => {
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



export function apiWithRole(allowedRoles, handler) {
  return async (req, res) => {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
          return res.status(401).json({ error: 'Unauthorized' });
      }

      const userRole = session.user.role;

      if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ error: 'Forbidden' });
      }

      return handler(req, res);
  };
}
