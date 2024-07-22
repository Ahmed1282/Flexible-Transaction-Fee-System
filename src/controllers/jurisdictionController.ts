import { Request, Response } from 'express';
import { JurisdictionService } from '../services/jurisdictionService';
import { StatusCodes } from 'http-status-codes';

const jurisdictionService = new JurisdictionService();

export const getAllJurisdictions = async (req: Request, res: Response): Promise<void> => {
  try {
    const jurisdictions = await jurisdictionService.getAllJurisdictions();
    res.status(StatusCodes.OK).json(jurisdictions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getJurisdictionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const jurisdiction = await jurisdictionService.getJurisdictionById(Number(id));
    if (jurisdiction) {
      res.status(StatusCodes.OK).json(jurisdiction);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An unknown error occurred' });
    }
  }
};


export const getJurisdictionByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.params;
      const jurisdiction = await jurisdictionService.getJurisdictionByName(name);
      if (jurisdiction) {
        res.status(StatusCodes.OK).json(jurisdiction);
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An unknown error occurred' });
      }
    }
  };

export const createJurisdiction = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const jurisdiction = await jurisdictionService.createJurisdiction(data);
    res.status(StatusCodes.CREATED).json(jurisdiction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateJurisdiction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const jurisdiction = await jurisdictionService.updateJurisdiction(Number(id), data);
    if (jurisdiction) {
      res.status(StatusCodes.OK).json(jurisdiction);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteJurisdiction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await jurisdictionService.deleteJurisdiction(Number(id));
    if (success) {
      res.status(StatusCodes.NO_CONTENT).end();
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An unknown error occurred' });
    }
  }
};
