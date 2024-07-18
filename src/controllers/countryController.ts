import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import countryService from '../services/countryService';

class CountryController {
  async createCountry(req: Request, res: Response) {
    try {
      const country = await countryService.createCountry(req.body);
      res.status(StatusCodes.CREATED).json(country);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async getAllCountries(req: Request, res: Response) {
    try {
      const countries = await countryService.getAllCountries();
      res.status(StatusCodes.OK).json(countries);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async getCountryById(req: Request, res: Response) {
    try {
      const country = await countryService.getCountryById(Number(req.params.id));
      if (!country) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Country not found' });
      } else {
        res.status(StatusCodes.OK).json(country);
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async getCountryByName(req: Request, res: Response) {
    try {
      const countryName = req.params.name; // Assuming you're passing the country name as a parameter
      const country = await countryService.getCountryByName(countryName);
      if (!country) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Country not found' });
      } else {
        res.status(StatusCodes.OK).json(country);
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async updateCountry(req: Request, res: Response) {
    try {
      const country = await countryService.updateCountry(Number(req.params.id), req.body);
      if (!country) {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Country not found' });
      } else {
        res.status(StatusCodes.OK).json(country);
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async deleteCountry(req: Request, res: Response) {
    try {
      const success = await countryService.deleteCountry(Number(req.params.id));
      if (success) {
        res.status(StatusCodes.NO_CONTENT).send();
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: 'Country not found' });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CountryController();
