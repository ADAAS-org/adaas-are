


export class AreCommonHelper {



    /**
     * Sets a nested property on an object using a dot-separated path string. This method safely navigates through the object structure and sets the value at the specified path, creating intermediate objects as needed. If any part of the path is invalid or if the input parameters are not properly formatted, the method will simply return without making any changes to the object.
     * 
     * @param obj The object on which to set the property.
     * @param path A dot-separated string representing the path to the desired property (e.g., "user.profile.name").
     * @param value The value to set at the specified path.
     * @returns the target object with the updated property, or undefined if the input parameters are invalid.
     */
    static setPropertyByPath(obj: unknown, path: string, value: any): Record<string, any> | undefined {
        if (!obj || typeof obj !== 'object' || !path || typeof path !== 'string') {
            return;
        }

        const parts = path.split('.');
        const lastPart = parts.pop() as string;

        const target = parts.reduce((acc, part) => {
            if (acc[part] === undefined) {
                acc[part] = {};
            }
            return acc[part];
        }, obj as Record<string, any>);

        target[lastPart] = value;

        return obj as Record<string, any>;
    }



    /**
     * Extracts a nested property from an object using a dot-separated path string. This method safely navigates through the object structure and returns the value at the specified path, or undefined if any part of the path is invalid or does not exist.
     * 
     * @param obj The object from which to extract the property.
     * @param path A dot-separated string representing the path to the desired property (e.g., "user.profile.name"). 
     * @returns The value at the specified path, or undefined if the path is invalid or does not exist. 
     */
    static extractPropertyByPath<T = any>(obj: unknown, path: string): T | undefined {
        if (!obj || typeof obj !== 'object' || !path || typeof path !== 'string') {
            return undefined;
        }

        try {
            const result = path.split('.').reduce<any>((acc, part) => {
                if (acc === null || acc === undefined) {
                    return undefined;
                }
                return acc[part];
            }, obj);

            return result as T | undefined;
        } catch {
            return undefined;
        }
    }


    /**
     * A secure alternative to eval for evaluating expressions in a controlled context.
     * This method uses a whitelist approach to allow only certain characters and patterns in the expression, and it also filters out any functions from the context to prevent execution of potentially harmful code.
     * 
     * @param expression The expression to evaluate.
     * @param context The context in which to evaluate the expression.
     * @returns The result of the evaluated expression, or undefined if the expression is invalid or contains disallowed characters or keywords.
     */
    static secureEval(
        expression: string,
        context: Record<string, any> = {}
    ): any {
        // Validate input
        if (!expression || typeof expression !== 'string' || !context) {
            return undefined;
        }

        // Whitelist allowed characters and patterns
        const allowedPattern = /^[a-zA-Z0-9_\.\[\]\(\)\+\-\*\/\%\=\<\>\!\&\|\^\~\?\:\,\s]+$/;
        if (!allowedPattern.test(expression)) {
            console.warn('Expression contains disallowed characters');
            return undefined;
        }

        // Blacklist dangerous keywords
        const dangerousKeywords = ['import', 'export', 'require', 'eval', 'Function', 'setTimeout', 'setInterval', 'fetch', 'XMLHttpRequest', 'document', 'window'];
        if (dangerousKeywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(expression))) {
            console.warn('Expression contains forbidden keywords');
            return undefined;
        }

        try {
            // Only allow safe context properties
            const safeContext = Object.fromEntries(
                Object.entries(context).filter(([_, value]) => typeof value !== 'function')
            );

            const func = new Function(...Object.keys(safeContext), `return ${expression};`);

            return func(...Object.values(safeContext));
        } catch (error) {
            console.error(`Error evaluating expression: ${expression}`, error);
            return undefined;
        }
    }
}