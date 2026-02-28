import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid'

const app = express()
app.use(cors())
app.use(express.json())

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
})

const plaidClient = new PlaidApi(config)

let ACCESS_TOKEN = null

app.post('/api/create-link-token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'footprint-demo-user' },
      client_name: 'FootPrint',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    })
    res.json({ link_token: response.data.link_token })
  } catch (err) {
    console.error('Error creating link token:', err.response?.data || err.message)
    res.status(500).json({ error: 'Failed to create link token' })
  }
})

app.post('/api/exchange-token', async (req, res) => {
  try {
    const { public_token } = req.body
    const response = await plaidClient.itemPublicTokenExchange({ public_token })
    ACCESS_TOKEN = response.data.access_token
    res.json({ success: true })
  } catch (err) {
    console.error('Error exchanging token:', err.response?.data || err.message)
    res.status(500).json({ error: 'Failed to exchange token' })
  }
})

app.get('/api/transactions', async (req, res) => {
  if (!ACCESS_TOKEN) {
    return res.status(400).json({ error: 'No bank account connected' })
  }

  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const response = await plaidClient.transactionsGet({
      access_token: ACCESS_TOKEN,
      start_date: thirtyDaysAgo.toISOString().split('T')[0],
      end_date: now.toISOString().split('T')[0],
      options: { count: 100, offset: 0 },
    })

    res.json({
      transactions: response.data.transactions,
      accounts: response.data.accounts,
      total: response.data.total_transactions,
    })
  } catch (err) {
    console.error('Error fetching transactions:', err.response?.data || err.message)
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`FootPrint API running on http://localhost:${PORT}`)
})
