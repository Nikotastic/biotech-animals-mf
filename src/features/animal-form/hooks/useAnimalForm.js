import { useState } from 'react'
import { animalFormService } from '../services/animalFormService'

export const useAnimalForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createAnimal = async (data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await animalFormService.createAnimal(data)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateAnimal = async (id, data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await animalFormService.updateAnimal(id, data)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createAnimal, updateAnimal, loading, error }
}