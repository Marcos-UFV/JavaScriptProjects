const express = require('express');
const AtendimentoDAO = require('../model/persistence/AtendimentoDAO');


const router = express.Router();

const atendimentoDAO = new AtendimentoDAO();

router.get('/',(req,res,next)=>{
  atendimentoDAO.getAtendimentos()
  .then( rows =>{
    res.send(rows);
  })
  .catch(err =>{
    console.log(err);
  })
});

router.get('/pacientes',(req,res,next)=>{
  atendimentoDAO.getAtendimentoPorPaciente()
  .then(rows =>{
    res.send(rows);
  })
  .catch(err =>{
    console.log(err);
  })
});
router.get('/pacientes/:cd_pac',(req,res,next)=>{
  const id = req.params.cd_pac;
  const data = req.query.data;
  atendimentoDAO.getAtendimentoPorPaciente(id,data)
  .then(rows =>{
    res.send(rows);
  })
  .catch(err =>{
    console.log(err);
  })
});

router.get('/:cd_pac',(req,res,next)=>{
  const data = req.query.data;
  atendimentoDAO.getAtendimentoByIdAndData(req.params.cd_pac,data)
  .then(rows =>{
    res.send(rows);
  })
  .catch(err =>{
    console.log(err);
  })
});

module.exports = router;