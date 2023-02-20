/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import Jwt from 'jsonwebtoken';
import logger from '../app.js';
import { Request, Response, NextFunction } from 'express';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1] ;
// @ts-ignore
  Jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      logger.error(err);
      return res.status(403).send({
        success: false,
        message: 'Authentication error'
      });
    }
// @ts-ignore    
    req.user = user;
    next();
  });
};

export default authentication;