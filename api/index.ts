import express from 'express'

const app = express()

app.get('/test', (_, res) => {
  res.json({
    message: 'Hello from the server',
    users: [
      {
        name: 'Cali',
        email: 'cali@zolran.com',
      },
      {
        name: 'Timx',
        email: 'timx@zolran.com',
      },
    ],
  })
})

export default app
