export abstract class ClipboardService {
    abstract copyToClipboard(text: string): Promise<void>;
}