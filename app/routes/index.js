import express from "express";

import { 
    getAllWork,
    createWork,
    updateWork,
    deleteWork
} from "../controllers/Works.js";

import { 
    getAllProject,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/OurProjects.js";

import {
    createUser,
    loginUser
 } from "../controllers/auth.js";

const router = express.Router();
router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/works', getAllWork);
router.post('/works', createWork);
router.patch('/works/:id', updateWork);
router.delete('/works/:id', deleteWork);

router.get('/project', getAllProject);
router.post('/project', createProject);
router.patch('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

export default router;