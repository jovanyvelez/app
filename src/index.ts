import { Elysia,t } from "elysia";
import { createUser } from './db/queries/insert.js';
//import db from './db/index.js';

const getFunction = () => {
  return "Hello";
}

const app = new Elysia()
  .get("/", getFunction())
  .get('/id/:id', ({ params: {id} })=> `Hello ${id}`)
  .get('/saludo', ()=>{return 'hi';})
  .get('/personal', ({ error }) => error(404, "Kirifuji Nagisa"))
  .post('/hi', () => 'hi')
  .post('/user', ({ body }) => createUser(body), {
    body: t.Object({
      name: t.String(),
      age: t.Number(),
      email: t.String(),
    }),
  })
  .onError(({code}) => {
      if(code === 'NOT_FOUND') {
        return 'Lo siento mucho no encuentro la ruta :(';
      }
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);






