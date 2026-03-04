export type UploadReviewSearch = {
	vorname: string;
	nachname: string;
	startDatum: string;
	endDatum: string;
	krankenstandsadresse: string;
	grundDerArbeitsunfaehigkeit: string;
	ausstellungsdatum: string;
	svNummer: string;
};

export type SaveResponse = {
	id: number;
	vorname: string;
	nachname: string;
	svNummer: string;
	startDatum: string;
	endDatum: string;
};
