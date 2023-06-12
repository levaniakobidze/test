const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
const clinicInfoSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phoneNumber: Number,
  workingHours: String,
});

const ClinicInfo = mongoose.model("clinicInfo", clinicInfoSchema);

const getClinicInfo = async (req, res) => {
  try {
    const clinicInfo = await ClinicInfo.find();
    res.json(clinicInfo);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving clinic info" });
  }
};

const getClinicInfoById = async (req, res) => {
  try {
    const clinicInfo = await ClinicInfo.findById(req.params.id);
    if (clinicInfo) {
      res.json(clinicInfo);
    } else {
      res.status(404).json({ error: "clinic info not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving clinic Info" });
  }
};

const createClinicInfo = async (req, res) => {
  try {
    const clinicInfo = new ClinicInfo(req.body);
    const newClinicInfo = await clinicInfo.save();
    res.json(newClinicInfo);
  } catch (error) {
    res.status(500).json({ error: "Error creating clinic info" });
  }
};

const updateClinicInfo = async (req, res) => {
  try {
    const clinicInfo = await ClinicInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ error: "clinic info not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating clinic info" });
  }
};
const deleteClinicInfo = async (req, res) => {
  try {
    const clinicInfo = await ClinicInfo.findByIdAndDelete(req.params.id);
    if (clinicInfo) {
      res.json(clinicInfo);
    } else {
      res.status(404).json({ error: "clinic info not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting clinic info" });
  }
};

module.exports = {
  getClinicInfo,
  updateClinicInfo,
  deleteClinicInfo,
  createClinicInfo,
  getClinicInfoById,
};
