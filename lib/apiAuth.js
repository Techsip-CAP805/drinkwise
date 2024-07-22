// lib/auth.js
import { getSession } from 'next-auth/react';

export function withApiAuth(allowedRoles, handler) {
    return async (req, res) => {
        const session = await getSession({ req });

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