module.exports = saveToDb = async (model) => {
  await model.save();
};
