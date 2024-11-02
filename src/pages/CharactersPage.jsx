import React from 'react'
import { CharacterList } from '../components/CharacterList'
import { Typography } from '@mui/material'

export const CharactersPage = () => {
  return (
    <div style={{ padding: '20px' }}>
       <Typography variant="h4" gutterBottom align="center">
       Characters
      </Typography>
    <CharacterList />
  </div>
  )
}
