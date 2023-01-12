require("express-async-errors"); //import de erros asincronos
const AppError = require("./utils/AppError");



const Express = require('express');
const app = Express();
app.use(Express.json())

const cors = require("cors");
app.use(cors()); // abilitar a função de receber as requisições do fron end

const uploadConfig = require("./configs/upload")
app.use("/files", Express.static(uploadConfig.UPLOADS_FOLDER));

const routes = require('./routes');
app.use(routes);


app.use((error, request, response, next) => { //
    if (error instanceof AppError) { //Se a instancia dele for de uma execessão de appError:
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);
    //Caso o erro não seja do cliente 
    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log('Server is running  in localhost:3333'))