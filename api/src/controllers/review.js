const { Review, User } = require("../db")

const getReview = async () => {
  try {
    return await Review.findAll()
  } catch (error) {
    console.log(error)
  }
}

let test = "test"

module.exports = { getReview }
