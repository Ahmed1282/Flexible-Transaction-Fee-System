import { Request, Response, NextFunction } from 'express';
import { JurisdictionService } from '../services/jurisdictionService';
import { StatusCodes } from 'http-status-codes';

const jurisdictionService = new JurisdictionService();

export const getAllJurisdictions = async (req: Request, res: Response) => {
  const jurisdictions = await jurisdictionService.getAllJurisdictions();
  res.status(StatusCodes.OK).json(jurisdictions);
};

export const getJurisdictionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const jurisdiction = await jurisdictionService.getJurisdictionById(Number(id));
  if (jurisdiction) {
    res.status(StatusCodes.OK).json(jurisdiction);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
  }
};

export const createJurisdiction = async (req: Request, res: Response) => {
  const jurisdiction = await jurisdictionService.createJurisdiction(req.body);
  res.status(StatusCodes.CREATED).json(jurisdiction);
};

export const updateJurisdiction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedJurisdiction = await jurisdictionService.updateJurisdiction(Number(id), req.body);
  if (updatedJurisdiction) {
    res.status(StatusCodes.OK).json(updatedJurisdiction);
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
  }
};

export const deleteJurisdiction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await jurisdictionService.deleteJurisdiction(Number(id));
  if (success) {
    res.status(StatusCodes.NO_CONTENT).end();
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Jurisdiction not found' });
  }
};
