const getUser = async () => {
  try {
    return await User.findAll()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getUser }
