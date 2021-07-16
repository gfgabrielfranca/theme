const fs = require('fs')

export default function handler(req, res) { 
  const { id } = req.query

  const data = fs.readFileSync(`./api/clients/${id}/theme.json`)

  const newData = {
    ...JSON.parse(data),
    ...req.body 
  }

  fs.writeFileSync(`./api/clients/${id}/theme.json`, JSON.stringify(newData))
  res.status(200).send("Ok")
}