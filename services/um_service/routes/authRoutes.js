import {Router} from 'express'
import {authController} from '../controllers/authController.js'
import {validate} from '../middleware/validateMiddleware.js'
import {authValidator} from '../validators/authValidator.js'
import {isLoggedIn} from '../middleware/authMiddlewares.js'

const router = Router()

router.post('/login' , validate(authValidator.loginUserSchema) , authController.loginUser)

router.post('/initiate-register' , validate(authValidator.startUserRegistrationSchema) , authController.startUserRegistration);
router.post('/register' , validate(authValidator.registerUserSchema) , authController.registerUser);

router.get('/logout'  , isLoggedIn , authController.logoutUser)

router.get('/me' , isLoggedIn , authController.getUserDetails)

export default router;