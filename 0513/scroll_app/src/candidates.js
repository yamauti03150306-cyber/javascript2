const candidates = [
  { id: 1, votes: 0 },
  { id: 2, votes: 0 },
  { id: 3, votes: 0 },
]

const updateVoteText = () => {
  candidates.forEach((item) => {
    const card = document.querySelector(`[data-id="${item.id}"]`)
    if (!card) {
      return
    }

    const votesEl = card.querySelector('.votes')
    if (votesEl) {
      votesEl.textContent = `${item.votes}票`
    }
  })
}

export const getRates = () => {
  const total = candidates.reduce((sum, item) => sum + item.votes, 0)
  return candidates.map((item) => ({
    id: item.id,
    votes: item.votes,
    rate: total > 0 ? Math.round((item.votes / total) * 100) : 0,
  }))
}

export const vote = (id) => {
  const target = candidates.find((item) => item.id === id)
  if (!target) {
    return
  }

  target.votes += 1
  updateVoteText()
}
