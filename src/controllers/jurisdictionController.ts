import { Request, Response } from 'express';
import { JurisdictionService } from '../services/jurisdictionService';

const jurisdictionService = new JurisdictionService();

// Get all jurisdictions
export const getAllJurisdictions = async (req: Request, res: Response) => {
  try {
    const jurisdictions = await jurisdictionService.getAllJurisdictions();
    res.json(jurisdictions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a jurisdiction by ID
export const getJurisdictionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const jurisdiction = await jurisdictionService.getJurisdictionById(parseInt(id));
    if (jurisdiction) {
      res.json(jurisdiction);
    } else {
      res.status(404).json({ error: 'Jurisdiction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new jurisdiction
export const createJurisdiction = async (req: Request, res: Response) => {
  try {
    const jurisdiction = await jurisdictionService.createJurisdiction(req.body);
    res.status(201).json(jurisdiction);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a jurisdiction
export const updateJurisdiction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const jurisdiction = await jurisdictionService.updateJurisdiction(parseInt(id), req.body);
    if (jurisdiction) {
      res.json(jurisdiction);
    } else {
      res.status(404).json({ error: 'Jurisdiction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a jurisdiction
export const deleteJurisdiction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const success = await jurisdictionService.deleteJurisdiction(parseInt(id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Jurisdiction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
