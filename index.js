const express = require("express");
const data = require("./data.js");

const app = express();
const port = 3001;

app.use(express.json());

app.get("/doctors", (req, res) => {
  const doctors = data.getDoctors();
  res.json(doctors);
});

app.get("/doctors/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = data.getDoctor(doctorId);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});

app.post("/doctors", (req, res) => {
  const doctor = req.body;
  const newDoctor = data.addDoctor(doctor);
  res.json(newDoctor);
});

app.put("/doctors/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const updatedDoctor = req.body;
  const doctor = data.updateDoctor(doctorId, updatedDoctor);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});

app.delete("/doctors/:id", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = data.deleteDoctor(doctorId);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: "Doctor not found" });
  }
});

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
});
