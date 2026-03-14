export type UploadReviewSearch = {
	vorname: string;
	nachname: string;
	startDatum: string;
	endDatum: string;
	krankenstandsadresse: string;
	grundDerArbeitsunfaehigkeit: string;
	ausstellungsdatum: string;
	svNummer: string;
	seminar?: string;
	blobName: string;
};

export interface ExtractionField {
	value: string;
}

export interface UploadResult {
    vorname: string | null;
    familienname: string | null;
    krankenstandsadresse: string | null;
    arbeitsunfaehigVon: string | null;
    letzterTagDerArbeitsunfaehigkeit: string | null;
    grundDerArbeitsunfaehigkeit: string | null;
    ausstellungsdatum: string | null;
    versicherungsnummer: string | null;
    blobName?: string;
}

export type SaveAbwesenheitRequest = {
	vorname: string;
	nachname: string;
	svNummer: string;
	startDatum: string;
	endDatum: string;
	blobName: string;
};

export type SaveResponse = {
	id: number;
	vorname: string;
	nachname: string;
	svNummer: string;
	startDatum: string;
	endDatum: string;
};
