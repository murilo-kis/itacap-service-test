import {getPrimaryPool} from "../db";
import {User, UserSchema} from "../models/userModel";
import jwt from "jsonwebtoken";
import config from "../config";
import {StringValue} from "ms";
import {getLogger} from '../loggerFactory';

import {Role} from "../role";
import {JWTSchema} from "../models/jwtModel";
import {Pool, RowDataPacket} from "mysql2/promise";

const log = getLogger('service.authService');

const JWT_EXPIRES_IN: string = config.jwtExpiresIn
log.info(`JWTs expire in:[${JWT_EXPIRES_IN}].`)

/**
 * Get the role name for a given user type.
 */
function getRoleNameForUserType(userType: number): string {
    const roleName = Role[userType];
    if (!roleName) {
        throw new Error(`Invalid role ID: ${userType}`);
    }
    return roleName;
}

async function getUser(username: string, passwordHash: string): Promise<User | null> {
    let user: User | null = null;
    try {
        const pool: Pool = await getPrimaryPool();
        const [rows]: [RowDataPacket[], any] = await pool.query(
            `SELECT *
             FROM users
             WHERE username = ?
               AND password_hash = ?`,
            [username, passwordHash]
        );
        if (rows.length == 1) {
            const row: RowDataPacket = rows[0];
            user = UserSchema.parse({
                id: row.user_id,
                username: username,
                type: row.user_type
            });
        }
    } catch (error) {
        log.error('Error fetching user error!', error);
    }
    return user;
}

const login = async (username: string, passwordHash: string): Promise<string | null> => {
    let token: string | null = null;
    if (!username || !passwordHash) {
        log.error('Missing username or password hash.');
    }
    const user: User | null = await getUser(username, passwordHash);
    if (user) {
        // If credentials are valid, create and sign a JWT
        const roleName: string = getRoleNameForUserType(user.type);
        const payload = JWTSchema.parse({
            sub: user.username,
            roles: [roleName],
            isAdmin: user.type === Role.admin,
        });
        const expiresIn: StringValue = JWT_EXPIRES_IN as `${number}`;
        token = jwt.sign(payload, config.jwtSecret, {expiresIn: expiresIn});
        log.info(`Login successful for username:[${user.username}]. Generated token:[${token}] which will expire in:[${config.jwtExpiresIn}].`);
    }
    return token
}

const hasRole = (token: string, role: Role) => {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded && typeof decoded === 'object' && 'roles' in decoded) {
        const roles = decoded.roles as string[];
        return roles.includes(Role[role]);
    }
    return false;
}

export {
    login,
    getRoleNameForUserType,
    hasRole
};