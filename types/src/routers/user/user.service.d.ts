import { CreateUserSchema, UpdateUserSchema, UserSchema } from 'adfinity-ui-schemas';
import { PaginationResult } from 'adfinity-ui-types';
declare const getUser: (id: number) => UserSchema;
declare const getUsers: (page: number, limit: number, search?: string, sort?: string) => PaginationResult<UserSchema>;
declare const createUser: (user: CreateUserSchema) => UserSchema;
declare const updateUser: (id: number, user: UpdateUserSchema) => UserSchema;
declare const deleteUser: (id: number) => void;
export { getUser, getUsers, createUser, updateUser, deleteUser };
