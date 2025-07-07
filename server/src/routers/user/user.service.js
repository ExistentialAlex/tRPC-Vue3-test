import { paginate } from '../../utils';
import { convertQueryStringToSort } from 'adfinity-ui-utilities';
let users = [
    {
        id: 1,
        name: 'Alex Ashwood',
        jobTitle: 'Developer',
    },
];
// Add more dummy users
// This is just for testing purposes, in a real application you would fetch this from a database
for (let i = 0; i < 50; i++) {
    users.push({
        id: i + 2,
        name: `User ${i + 1}`,
        jobTitle: 'Developer',
    });
}
const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
    return user;
};
const getUsers = (page, limit, search, sort) => {
    return paginate(users, page, limit, search, convertQueryStringToSort(sort || ''));
};
const createUser = (user) => {
    const newUser = {
        id: users.length + 1,
        ...user,
    };
    users.push(newUser);
    return newUser;
};
const updateUser = (id, user) => {
    const existingUser = getUser(id);
    const updatedUser = { ...existingUser, ...user };
    users = users.map((u) => (u.id === id ? updatedUser : u));
    return updatedUser;
};
const deleteUser = (id) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        throw new Error(`User with id ${id} not found`);
    }
    users.splice(userIndex, 1);
};
export { getUser, getUsers, createUser, updateUser, deleteUser };
