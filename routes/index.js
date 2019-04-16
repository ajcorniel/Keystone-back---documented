import express from 'express';
import users from '../routes/usersRoutes'
import auth from '../routes/authRoutes'
let router = express.Router();

router.use('/user', users);
router.use('/login', auth);

export default router;
