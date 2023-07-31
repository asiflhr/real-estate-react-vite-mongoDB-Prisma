import express from 'express'
import {
  createUser,
  bookVisit,
  cancelBooking,
  getAllBookings,
  getAllFavorities,
  toFav,
} from '../controllers/userCntrl.js'
import jwtCheck from '../config/auth0Config.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/bookVisit/:id', bookVisit)
router.post('/allBookings', getAllBookings)
router.post('removeBooking/:id', cancelBooking)
router.post('toFav/:rid', toFav)
router.post('allFav', getAllFavorities)

export { router as userRoute }
