import {Router} from 'express'
import {authController} from '../controllers/authController.js'
import {validate} from '../middleware/validateMiddleware.js'
import {authValidator} from '../validators/authValidator.js'

const router = Router()

router.post('/login'  ,authController.loginUser)

router.post('/initiate-register' , validate(authValidator.startUserRegistrationSchema) , authController.startUserRegistration);
router.post('/register' , validate(authValidator.registerUserSchema) , authController.registerUser);

router.get('/logout' , authController.logoutUser)

router.get('/me' , authController.getMe)


export default router;