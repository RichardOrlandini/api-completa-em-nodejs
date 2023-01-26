module.exports = {
  bail: true,
  coverageProvider: "v8", 

  testMatch: [
    //Expressão regular para definir o padrão dos arquivos de testes.
    "<rootDir>/src/**/*.spec.js"
  ],

}