import express from 'express';
import authentication from './authenticaiton';
import users from "./user"


const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);

  return router;
};