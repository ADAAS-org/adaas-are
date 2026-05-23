import { A_Component, A_Concept } from "@adaas/a-concept";
import { A_Frame } from "@adaas/a-frame/core";

@A_Frame.Define({
    namespace: 'A-ARE',
    description: 'Abstract base component that observes external changes and emits A_Signals to drive reactive updates within the ARE pipeline. Subclasses override init() to set up initial state and watch() to begin observing — for example, polling a data source, listening to DOM events, or subscribing to a store — and call the appropriate signal methods to notify the engine when a re-render is needed.'
})
export class AreWatcher extends A_Component {

    /**
     * Initialize the watcher. This method is called once when the watcher is first created. Use this to set up any necessary state or start observing changes.
     */
    init(): Promise<void> | void {

    }

    /**
     * Start watching for changes. This method is called after the engine has executed. Use this to set up any necessary event listeners or intervals to observe changes and produce signals.
     */
    watch(): Promise<void> | void {

    }

    /**
     * Stop the watcher and clean up any resources. This method is called when the watcher is being destroyed. Use this to remove any event listeners or intervals that were set up in watch() to prevent memory leaks.
     */
    @A_Concept.Stop()
    destroy(): Promise<void> | void {

    }
}