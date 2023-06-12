const express = require("express");
const doctorController = require("./controllers/doctorController");

const app = express();
const port = 3001;

app.use(express.json());

app.get("/doctors", doctorController.getDoctors);

app.get("/doctors/:id", doctorController.getDoctorById);

app.post("/doctors", doctorController.createDoctor);

app.put("/doctors/:id", doctorController.updateDoctor);

app.delete("/doctors/:id", doctorController.deleteDoctor);

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
});
