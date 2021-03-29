import { body, param, ValidationChain } from 'express-validator';


const rules: Record<string, ValidationChain[]> = {
  getPets: [
    body('ownerId', 'You must provide an owner ID!').exists(),
    body('ownerId', 'Owner ID must be a number!').isNumeric(),
  ],
  postPets: [
    body('ownerId', 'You must provide an owner ID!').exists(),
    body('ownerId', 'Owner ID must be a number!').isNumeric(),

    body('name', 'Pet name must be provided!').exists(),
    body('name', 'Pet name can only contain alphabetical characters!').isAlpha(),
    body('name', 'Pet name must be at least 1 character long!').isLength({min: 1}),
    body('name', 'Pet name must be at most 30 character long!').isLength({max: 30}),
  ],
  deletePets: [
    param('id', 'You must provide an pat ID as a paramater!').exists(),
    param('id', 'Pet ID must be numeric!').isNumeric(),
  ],

  updatePets: [
    param('id', 'You must provide an pat ID as a paramater!').exists(),
    param('id', 'Pet ID must be numeric!').isNumeric(),

    body('name', 'Pet name must be provided!').exists(),
    body('name', 'Pet name can only contain alphabetical characters!').isAlpha(),
    body('name', 'Pet name must be at least 1 character long!').isLength({min: 1}),
    body('name', 'Pet name must be at most 30 character long!').isLength({max: 30}),
  ],
};


export const getPetValidationRules = (method: string): ValidationChain[] => rules[method];