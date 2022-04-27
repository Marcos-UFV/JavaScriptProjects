const express = require('express');
const PacienteDAO = require('../model/persistence/PacienteDAO');
const Paciente = require('../model/Paciente');

const pacienteDAO = new PacienteDAO();

const router = express.Router();

pacienteDAO.testaConexao();



router.get('/',(req,res,next) =>{
  const orderQuery = req.query.order?req.query.order:'cd_pac';
  pacienteDAO.getPacientes(res,orderQuery);
});

router.get('/:id',(req,res,next)=>{
  pacienteDAO.getPacienteById(res,req.params.id);
})

router.post('/',(req,res,next)=>{
  const paciente = new Paciente(req.body);
  pacienteDAO.insertPaciente(res,paciente);
});

router.put('/',(req,res,next)=>{
  const paciente = new Paciente(req.body);
  pacienteDAO.updatePaciente(res,paciente);
})

module.exports = router;