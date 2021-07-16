import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import fs from 'fs'
import path from 'path'

import * as S from '../../styles/client'

export default function Client1({ id, initialPrimaryColor, initialBackgroundColor }) {
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor)
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor)

  function handlePrimaryColor(event) {
    setPrimaryColor(event.target.value)
  }

  function handleBackgroundColor(event) {
    setBackgroundColor(event.target.value)
  }

  async function handleSave() {
    const result = await axios.post(`/api/clients/${id}`, { 
      primaryColor, backgroundColor 
    })

    alert(result.data)
  }

  useEffect(() => {
    setPrimaryColor(initialPrimaryColor)
    setBackgroundColor(initialBackgroundColor)
  }, [initialPrimaryColor, initialBackgroundColor])
  
  return (
    <div>
      <S.Links>
        <Link href="/clients/1">
          <a className={id === '1' ? 'active' : ''}>Client 1</a>
        </Link>
        <Link href="/clients/2">
          <a className={id === '2' ? 'active' : ''}>Client 2</a>
        </Link>
      </S.Links>
      <S.Inputs>
        <div>
          <label htmlFor="primaryColor">Primary Color: </label>
          <input
            type="color"
            name="primaryColor"
            id="primaryColor"
            onChange={handlePrimaryColor}
            value={primaryColor}    
          />
        </div>
        <div>
          <label htmlFor="backgroundColor">Background Color: </label>
          <input
            type="color"
            name="backgroundColor"
            id="backgroundColor"
            onChange={handleBackgroundColor}
            value={backgroundColor}    
          />
        </div>
      </S.Inputs>
      <button type="button" onClick={handleSave}>Salvar</button>
    </div>
  )
}

export async function getServerSideProps({ params: { id } }) {
  // const test = path.join(__dirname, '..', 'api', 'clients', id, 'theme.json');

  // const data = fs.readFileSync(test)


  const dir = path.resolve('./public', 'api', 'clients', id, 'theme.json');

  const data = fs.readFileSync(dir)
  const theme = JSON.parse(data)

  return {
    props: {
      id,
      initialPrimaryColor: theme.primaryColor,
      initialBackgroundColor: theme.backgroundColor
    }
  }
}