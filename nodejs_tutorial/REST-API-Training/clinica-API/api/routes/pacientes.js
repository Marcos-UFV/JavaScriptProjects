const express = require('express');
const PacienteDAO = require('../model/persistence/PacienteDAO');
const Paciente = require('../model/Paciente');

const pacienteDAO = new PacienteDAO();

const router = express.Router();

pacienteDAO.testaConexao();



router.get('/',(req,res,next) =>{
  const orderQuery = req.query.order?req.query.order:'cd_pac';
  pacienteDAO.getPacientes(orderQuery).then(rows =>{
    res.send(rows);
  }).catch(err =>{
    console.log(err);
  })
});

router.get('/:id',(req,res,next)=>{
  pacienteDAO.getPacienteById(req.params.id)
  .then(row =>{
    res.send(row);
  }).catch(err =>{
    console.log(err);
  })
})

router.post('/',(req,res,next)=>{
  const paciente = new Paciente(req.body);
  pacienteDAO.insertPaciente(paciente)
  .then(row =>{
    res.send(row);
  })
  .catch(err =>{
    console.log(err);
  })
});

router.put('/',(req,res,next)=>{
  const paciente = new Paciente(req.body);
  pacienteDAO.updatePaciente(paciente)
  .then(row =>{
    res.send(row);
  })
  .catch(err =>{
    console.log(err);
  });
})

module.exports = router;