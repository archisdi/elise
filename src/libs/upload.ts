
interface SignedObject {
    url: string;
    filename: string;
}

export interface FileUpload {
    generateSignedUrl(mime: string, folder: string, name?: string): Promise<SignedObject>;
}

export default FileUpload;
