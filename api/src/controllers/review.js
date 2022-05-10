const getReview = async () => {
  try {
    return await Review.findAll()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getReview }