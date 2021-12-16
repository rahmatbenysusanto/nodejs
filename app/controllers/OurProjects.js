import OurProject from "../models/ourProject.js";

export const getAllProject = async (req, res) => {
    try {
        const projects = {
            'status' : 200,
            'message' : 'GET Our Project successfully!',
            'data' : await OurProject.findAll()
        };
        res.json(projects);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createProject = async (req, res) => {
    try {
        await OurProject.create(req.body);
        res.json({
            'status' : 200,
            'message' : 'Our Project Created Successfully!',
            'data' : []
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateProject = async (req, res) => {
    try {
        await OurProject.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            'status' : 200,
            'message' : 'Our Project Updated is Successfully!',
            'data' : []
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteProject = async (req, res) => {
    try {
        await OurProject.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            'status' : 200,
            'message' : 'Our Project Deleted is Successfully!',
            'data' : []
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}