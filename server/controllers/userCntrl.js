import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

// create a user
export const createUser = asyncHandler(async (req, res) => {
  console.log('creating a user...')

  let { email } = req.body

  const userExists = await prisma.user.findUnique({ where: { email: email } })

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body })
    res.send({
      message: 'User created successfully',
      user: user,
    })
  } else res.status(201).send({ message: 'User already exists' })

  // console.log('email: ', email)
})

// book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, data } = req.body
  const { id } = req.params

  try {
    const alreadyBooked = await prisma.visit.findUnique({
      where: { email },
      select: { bookedVisits: true },
    })

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: 'This residency is already booked' })
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      })
      res.send('Your visit has been booked')
    }
  } catch (err) {
    throw new Error(err)
  }
})

// get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    })
    res.status(200).send(bookings)
  } catch (err) {
    throw new Error(err)
  }
})

// cancel the booking of a user
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    })

    const index = user.bookedVisits.findIndex((visit) => visit.id === id)

    if (index === -1) {
      res.status(404).json({ message: 'No booking found' })
    } else {
      user.bookedVisits.splice(index, 1)
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      })

      res.send('Booking cancelled successfully')
    }
  } catch (err) {
    throw new Error(err)
  }
})

// add a residency in favorites list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body
  const { rid } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      })

      res.send({
        message: 'Residency removed from favorites',
        user: updateUser,
      })
    }
  } catch (err) {
    throw new Error(err)
  }
})

// get all residencies in favorites list of a user
export const getAllFavorities = asyncHandler(async (req, res) => {
  const { email } = req.body

  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    })
    res.status(200).send(favResd)
  } catch (err) {
    throw new Error(err)
  }
})
