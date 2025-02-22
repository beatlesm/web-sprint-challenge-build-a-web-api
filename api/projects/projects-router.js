// Write your "projects" router here!
const router = require("express").Router()
const md = require('./projects-middleware')
const Project = require("./projects-model")

router.get("/", (req, res, next) => {
    Project.get()
        .then(projects => {
        res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', md.validateProjectId, (req, res) => {
    res.json(req.project)  
});

router.post('/', md.validateProject, (req, res, next) => {
    
    Project.insert(req.body)
      .then(newProject => {      
        res.status(201).json(newProject)
      })
      .catch(next)
});  

router.put('/:id', md.validateProjectId, md.validateProject, (req, res, next) => {
    
    Project.update(req.params.id, req.body)
      .then(updatedProject => {      
        res.status(201).json(updatedProject)
      })
      .catch(next)
  });

router.delete('/:id', md.validateProjectId, (req, res, next) => {
    
    Project.remove(req.params.id)
      .then(() => {      
        res.status(201).json(req.project)
      })
      .catch(next)
});  

router.get('/:id/actions', md.validateProjectId, (req, res, next) => {
        
    Project.getProjectActions(req.params.id)
      .then( actions => {
        res.status(200).json(actions)
      })
      .catch (next)
});

module.exports = router