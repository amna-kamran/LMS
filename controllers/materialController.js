const Material = require("../models/Material");

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
