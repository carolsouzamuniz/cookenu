import express from 'express';
import dotenv from 'dotenv';
import {AddressInfo} from 'net';
import { signUp } from './endpoints/signUp';
import { login } from './endpoints/login';
import { getProfile } from './endpoints/getProfile';
import { getUser } from './endpoints/getUser';
import { createRecipe } from './endpoints/createRecipe';
import { getRecipe } from './endpoints/getRecipe';
import { follow } from './endpoints/follow';
import { unfollow } from './endpoints/unfollow';
import { getFeed } from './endpoints/getFeed';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/signup', signUp);
app.post('/login', login);
app.get('/user/profile', getProfile);
app.get('/user/:id', getUser);
app.post('/recipe', createRecipe);
app.post('/recipe/:id', getRecipe);
app.post('/user/follow', follow);
app.post('/user/unfollow', unfollow);
app.get('/feed', getFeed);

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
  });
