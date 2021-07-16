import fs from 'fs'
import path from 'path'

export default function handler(req, res) { 
  const { id } = req.query

  const data = fs.readFileSync(path.resolve('./public', 'api', 'clients', id, 'theme.json'))

  const newData = {
    ...JSON.parse(data),
    ...req.body 
  }

  fs.writeFileSync(path.resolve('./public', 'api', 'clients', id, 'theme.json'), JSON.stringify(newData))
  res.status(200).send("Ok")
}