const express = require("express");
const doctorController = require("./controllers/doctorController");
const clinicInfoController = require("./controllers/clinicInfoController");
const app = express();
const port = 3001;

app.use(express.json());
//clinic info API
app.get("/info", clinicInfoController.getClinicInfo);

app.get("/info/:id", clinicInfoController.getClinicInfoById);

app.post("/info", clinicInfoController.createClinicInfo);

app.put("/info/:id", clinicInfoController.updateClinicInfo);

app.delete("/info/:id", clinicInfoController.deleteClinicInfo);

//doctors API

app.get("/doctors", doctorController.getDoctors);

app.get("/doctors/:id", doctorController.getDoctorById);

app.post("/doctors", doctorController.createDoctor);

app.put("/doctors/:id", doctorController.updateDoctor);

app.delete("/doctors/:id", doctorController.deleteDoctor);

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
});
