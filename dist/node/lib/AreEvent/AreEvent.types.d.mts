/**
 * Properties for the AreEvent context
 *
 */
type AreEventProps<T = any> = {
    /**
     * The data associated with the event
     */
    data: T;
    /**
     * The name of the event
     */
    event: string;
};

export type { AreEventProps };
