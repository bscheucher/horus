import { z } from "zod";

// Shared type for data passed between upload → review → confirmation steps
export const uploadDataSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	start: z.string(),
	end: z.string(),
	address: z.string(),
	reason: z.string(),
	issueDate: z.string(),
	insuranceNumber: z.string(),
});

export type UploadData = z.infer<typeof uploadDataSchema>;

// Types describing the server's document extraction response
export interface ExtractionField {
	validation_problem: boolean;
	note: string;
	confidence: number;
	bbox_refs: { page_num: number; bbox_id: number }[];
	value: string;
}

export interface UploadResult {
	processing_id: string;
	workflow_id: string;
	workflow_name: string;
	available_results: string[];
	extractions: {
		schema_version: number;
		document_type: string;
		vorname: ExtractionField | null;
		familienname: ExtractionField | null;
		krankenstandsadresse: ExtractionField | null;
		arbeitsunfaehig_von: ExtractionField | null;
		letzter_tag_der_arbeitsunfaehigkeit: ExtractionField | null;
		grund_der_arbeitsunfaehigkeit: ExtractionField | null;
		ausstellungsdatum: ExtractionField | null;
		versicherungsnummer: ExtractionField | null;
	};
}
