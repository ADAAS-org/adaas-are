import { A_Component } from '@adaas/a-concept';

declare class AreWatcher extends A_Component {
    /**
     * Initialize the watcher. This method is called once when the watcher is first created. Use this to set up any necessary state or start observing changes.
     */
    init(): Promise<void> | void;
    /**
     * Start watching for changes. This method is called after the engine has executed. Use this to set up any necessary event listeners or intervals to observe changes and produce signals.
     */
    watch(): Promise<void> | void;
    /**
     * Stop the watcher and clean up any resources. This method is called when the watcher is being destroyed. Use this to remove any event listeners or intervals that were set up in watch() to prevent memory leaks.
     */
    destroy(): Promise<void> | void;
}

export { AreWatcher };
