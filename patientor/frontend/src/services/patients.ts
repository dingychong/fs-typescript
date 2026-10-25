import axios from "axios";
import { Patient, NewPatientEntry, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: NewPatientEntry) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`,
  );

  return data;
}

const getDiagnoses = async () => {
  const { data } = await axios.get(
    `${apiBaseUrl}/diagnoses`,
  );
  return data;
};

const postEntry = async (id: string, entry: NewEntry) => {
  const { data }  = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
  
}
export default {
  getAll, create, getPatientById, getDiagnoses, postEntry
};

