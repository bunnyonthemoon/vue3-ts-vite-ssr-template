import { Router } from 'express'

const router = Router()

router.get('/test/', (req, res) => {
    res.send('YEAH!')
})

export default router
