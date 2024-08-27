import { saveAtendimento } from '@/services/appointment'
import type { IAppointment } from '@/utils/interfaces'
import { defineStore } from 'pinia'

const defaultAppointment = {
  name: '',
  cpf: '',
  dataAppointment: new Date(),
  chiefComplaints: '',
  allergies: '',
  historyPresent: '',
  familyHistory: '',
  medicines: [
    {
      name: '',
      description: '',
      dosage: ''
    }
  ]
}

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointment: defaultAppointment as IAppointment,
    isLoading: false
  }),

  actions: {
    async AddAppointment(appointment: IAppointment): Promise<Object> {
      this.isLoading = true
      try {
        await saveAtendimento(appointment)
        return {type:'success', message:'Atendimento salvo com sucesso!', }
      } catch (error) {
        console.error('Erro ao adicionar o atendimento:', error)
        return  {type:'error', message:'Erro ao salvar o atendimento. Tente novamente.'}
      } finally {
        this.isLoading = false
      }
    }
  }
})
