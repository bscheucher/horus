export interface SeminarDto {
	id: number;
	seminarBezeichnung: string | null;
	kursDatumVon: string | null;
	kursDatumBis: string | null;
	projektId: string | null;
	projektName: string | null;
	seminarNumber: string | null;
	kostentraegerDisplayName: string | null;
	standort: string | null;
	schieneUhrzeit: string | null;
	massnahmennummer: string | null;
	veranstaltungsnummer: string | null;
}
