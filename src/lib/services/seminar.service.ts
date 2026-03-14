import { config } from "../../config/env.ts";
import type { SeminarDto } from "../../types/seminar.ts";
import { apiClient } from "../api/api-client.ts";

const TEILNEHMER_ID = 6912;
const SEMINARE_ENDPOINT = `${config.tnPortalBasePath}/teilnehmer/${TEILNEHMER_ID}/seminare`;

export async function fetchSeminare(): Promise<SeminarDto[]> {
	return apiClient.get<SeminarDto[]>(SEMINARE_ENDPOINT);
}
