export const state = () => ({
  searchText: ''
})

export const mutations = {
  setSearchText(state, payload) {
    state.searchText = payload
  }
}