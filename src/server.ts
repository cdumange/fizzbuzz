import app from './app/app'

const defaultPort = 3000

const PORT:number = Number(process.env.PORT) || defaultPort;

app.listen(PORT);