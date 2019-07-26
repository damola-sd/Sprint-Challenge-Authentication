const db = require('../dbConfig');
const Users = require('./user-model');


beforeEach(async () => {
    await db('users').truncate();
});

describe('users.add', () => {
    it('is able to add users to the db!', async () => {
        let users = await Users.find();
        expect(users).toHaveLength(0);

        // set up
        await Users.add({ username: 'Damola', password: '1234' });
        await Users.add({ username: 'Yetunde', password: 'Onigbanjo' });
        result = await Users.find();

        
        expect(result).toHaveLength(2);
    });

    it('is able to insert the correct users', async () => {
        let users = await Users.find();
        expect(users).toHaveLength(0);

        await Users.add({ username: 'Damola', password: '1234' });
        await Users.add({ username: 'Yetunde', password: 'Onigbanjo' });
        results = await Users.find();

        expect(results[0].username).toBe('Damola');
        expect(results[0].password).toBe('1234');
    });

    
});