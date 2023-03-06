const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");


describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;
    
    beforeEach(() => { // executa para cada teste, antes de ser rodado
        userRepositoryInMemory = new UserRepositoryInMemory;
        userCreateService = new UserCreateService(userRepositoryInMemory)
    })

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123"
        };
    
      
        const userCreated =  await userCreateService.execute(user);
        expect(userCreated).toHaveProperty("id");
        
    
    });

    it("user not should be create with exists email ", async () => {
        const user1 = {
            name: "User test 1",
            email: "user@test.com",
            password: "123"
        };

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "456"
        };

        //criar usuario:
        await userCreateService.execute(user1);
        // criar usuario com email ja cadastrado:
        expect(async () => {
            await userCreateService.execute(user2)
        }).rejects.toEqual(new AppError("Este email já  está em uso!"));
        
    });
});

/**
 

  it("", () => {

    });
 */
