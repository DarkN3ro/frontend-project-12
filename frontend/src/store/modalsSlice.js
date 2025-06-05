import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createModalOpen: false,
  renameModalOpen: false,
  removeModalOpen: false,
  currentChannel: null,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openCreateModal(state) {
      state.createModalOpen = true
    },
    closeCreateModal(state) {
      state.createModalOpen = false
    },
    openRemoveModal(state, action) {
      state.removeModalOpen = true
      state.currentChannel = action.payload
    },
    closeRemoveModal(state) {
      state.removeModalOpen = false
      state.currentChannel = null
    },
    openRenameModal(state, action) {
      state.renameModalOpen = true
      state.currentChannel = action.payload
    },
    closeRenameModal(state) {
      state.renameModalOpen = false
      state.currentChannel = null
    },
  },
})

export const {
  openCreateModal,
  closeCreateModal,
  openRemoveModal,
  closeRemoveModal,
  openRenameModal,
  closeRenameModal,
} = modalsSlice.actions

export default modalsSlice.reducer
