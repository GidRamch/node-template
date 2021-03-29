import { callProcedure } from '../../services/mysql';


export const readPets = async (OWNER_ID: number): Promise<unknown> => {
  return await callProcedure(
    'READ$PETS_VIA_OWNER',
    { OWNER_ID },
  );
};


export const createPet = async (
  OWNER_ID: number,
  NAME: string,
): Promise<unknown> => {
  return await callProcedure(
    'CREATE$PET',
    { NAME, OWNER_ID },
  );
};


export const deletePet = async (
  ID: number,
): Promise<unknown> => {
  return await callProcedure(
    'DELETE$PET',
    { ID },
  );
};


export const updatePet = async (
  ID: number,
  NAME: string,
): Promise<unknown> => {
  return await callProcedure(
    'UPDATE$PET',
    { ID, NAME },
  );
};