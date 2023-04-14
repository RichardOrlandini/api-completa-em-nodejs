const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require("../repositories/UserRepositories/UserRepositoryInMemory")
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

    it("shold not create user with exists email", async()=>{
        const user1={
            name:"user test 1",
            email:"newuser@example.com",
            password:"123"
        }
        const user2={
            name:"user test 2",
            email:"newuser@example.com",
            password:"456"
        }

        const userRepository= new UserRepositoryInMemory()
        const userCreateService= new UserCreateService(userRepository)
       await  userCreateService.execute(user1)
       await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já  está em uso!"))
    });
    /*
    it("user must not login with different password", async () => {
        
        const user1 = {
            name: "User test 1",
            email: "user@test.com",
            password: "123"
        };
        //criar usuario:
        await userCreateService.execute(user1);
        // criar usuario com email ja cadastrado:

        

    });
    */


});

/**
 

  it("", () => {

    });
 */
