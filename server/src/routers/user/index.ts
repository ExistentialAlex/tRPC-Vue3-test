import { router, publicProcedure } from '../../trpc';
import {
  CreateUserSchema,
  GetUserSchema,
  PaginateSchema,
  UserSchema,
} from 'adfinity-ui-schemas';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './user.service';

export const userRouter = router({
  list: publicProcedure.input(PaginateSchema).query(({ input }) => {
    return getUsers(input.page, input.limit, input.search, input.sort);
  }),
  get: publicProcedure.input(GetUserSchema).query(({ input }) => {
    return getUser(input.id);
  }),
  create: publicProcedure.input(CreateUserSchema).mutation(({ input }) => {
    return createUser(input);
  }),
  update: publicProcedure.input(UserSchema).mutation(({ input }) => {
    return updateUser(input.id, input);
  }),
  delete: publicProcedure.input(GetUserSchema).mutation(({ input }) => {
    return deleteUser(input.id);
  }),
});
