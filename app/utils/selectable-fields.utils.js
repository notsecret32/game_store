export const userSelectedFields = {
  id: true,
  username: true,
  role: true
}

export const reviewSelectedFields = {
  id: true,
  review: true,
  userId: true,
  liked: true
}

export const gameSelectedFields = {
  id: true,
  name: true,
  description: true,
  price: true,
  releaseDate: true,
  category: {
    select: {
      id: true,
      name: true
    }
  },
  developer: {
    select: {
      id: true,
      name: true
    }
  },
  reviews: {
    select: reviewSelectedFields
  }
}
