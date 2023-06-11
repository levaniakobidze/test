let doctors = [];

module.exports = {
  // Get all doctors
  getDoctors() {
    return doctors;
  },
  // Get a specific doctor by ID
  getDoctor(id) {
    return doctors.find((doctor) => doctor.id === id);
  },
  // Add a new doctor
  addDoctor(doctor) {
    doctor.id = doctors.length + 1;
    doctors.push(doctor);
    return doctor;
  },
  // Update a doctor by ID
  updateDoctor(id, updatedDoctor) {
    const doctorIndex = doctors.findIndex((doctor) => doctor.id === id);
    if (doctorIndex !== -1) {
      doctors[doctorIndex] = { ...doctors[doctorIndex], ...updatedDoctor };
      return doctors[doctorIndex];
    }
    return null;
  },
  // Delete a doctor by ID
  deleteDoctor(id) {
    const doctorIndex = doctors.findIndex((doctor) => doctor.id === id);
    if (doctorIndex !== -1) {
      const deletedDoctor = doctors[doctorIndex];
      doctors.splice(doctorIndex, 1);
      return deletedDoctor;
    }
    return null;
  },
};
