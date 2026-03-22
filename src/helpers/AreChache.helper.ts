export class AreCacheHelper {


    /**
     * Generates hash uses for deduplication
     * 
     * @param str 
     */
    static createHash(str?: string): string
    static createHash(str?: undefined): string
    static createHash(str?: Record<string, any>): string
    static createHash(str?: Array<any>): string
    static createHash(str?: number): string
    static createHash(str?: boolean): string
    static createHash(str?: null): string
    static createHash(map?: Map<any, any>): string
    static createHash(set?: Set<any>): string
    static createHash(str?: any): string {
        let hashSource: string;

        if (str instanceof Map) {
            hashSource = JSON.stringify(Array.from(str.entries()));
        } else if (str instanceof Set) {
            hashSource = JSON.stringify(Array.from(str.values()));
        } else {
            switch (typeof str) {
                case 'string':
                    hashSource = str;
                    break;
                case 'undefined':
                    hashSource = 'undefined';
                    break;

                case 'object':
                    if ('toJSON' in str)
                        hashSource = JSON.stringify(str.toJSON());

                    else
                        hashSource = JSON.stringify(str);
                    break;
                case 'number':
                    hashSource = str.toString();
                    break;
                case 'boolean':
                    hashSource = str ? 'true' : 'false';
                    break;
                case 'function':
                    hashSource = str.toString();
                    break;
                default:
                    hashSource = String(str);
            }
        }

        let hash = 0, i, chr;
        for (i = 0; i < hashSource.length; i++) {
            chr = hashSource.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        const hashString = hash.toString();

        return hashString;
    }
}