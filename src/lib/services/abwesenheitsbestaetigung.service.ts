import {config} from "../../config/env.ts";
import type {SaveAbwesenheitRequest, SaveResponse, UploadResult,} from "../../types/upload.files.ts";
import {apiClient} from "../api/api-client.ts";

const UPLOAD_ABWESENHEITSBESTAETIGUNG_ENDPOINT = `${config.tnPortalBasePath}/abwesenheitsbestaetigungen/uploads`;
const SAVE_ABWESENHEIT_ENDPOINT = `${config.tnPortalBasePath}/abwesenheitsbestaetigungen`;

export async function uploadAbwesenheitsbestaetigung(
    file: File,
): Promise<UploadResult> {
    const formData = new FormData();
    formData.append("file", file);

    let uploadResult: UploadResult | null = null;
    let capturedBlobName: string | null = null;

    await apiClient.postFormDataSSE<Record<string, unknown>>(
        UPLOAD_ABWESENHEITSBESTAETIGUNG_ENDPOINT,
        formData,
        (event) => {
            if (event.event === "status") {
                const statusData = event.data as { blobName?: string };
                if (statusData.blobName) {
                    capturedBlobName = statusData.blobName;
                }
            }
            if (event.event === "error") {
                const errorPayload = event.data as { error?: string } | undefined;
                throw new Error(errorPayload?.error ?? `SSE error event occurred.`);
            }

            if (event.event === "success") {
                const payload = event.data as { result: UploadResult };

                if (!payload.result) {
                    throw new Error("SSE success event contained no result object.");
                }

                uploadResult = {
                    ...payload.result,
                    blobName: capturedBlobName || ""
                };
            }
        },
    );

    if (!uploadResult) {
        throw new Error("Upload completed without receiving valid extraction data.");
    }
    console.log(uploadResult);
    return uploadResult;
}

export async function saveAbwesenheitData(
    request: SaveAbwesenheitRequest,
): Promise<SaveResponse> {
    return apiClient.post<SaveResponse>(SAVE_ABWESENHEIT_ENDPOINT, request);
}
