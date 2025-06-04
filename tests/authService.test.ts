import {describe, expect, test} from '@jest/globals';
import {getRoleNameForUserType, hasRole, login} from "../src/service/authService";
import {Role} from "../src/role";
import {shutdownPools} from "../src/db";

describe('authService', () => {
    test('should get role for user type', () => {
        expect(getRoleNameForUserType(1)).toBe(Role[Role.admin]);
        expect(getRoleNameForUserType(2)).toBe(Role[Role.center]);
    });
    test('login', async () => {
        const token: string | null = await login('admin', '$2b$10$vrkeSkmzvV2oyo35FfVcBefiOoAPWYwNcHi1VNB9eszxYHx305BIy') // 123456
        expect(token).not.toBeNull()
        // @ts-expect-error token only null when login failed
        expect(hasRole(token, Role.admin)).toBeTruthy();
    });
});

afterAll(async () => {
    await shutdownPools();
});
