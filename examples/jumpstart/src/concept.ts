import { A_Concept, A_CONSTANTS__DEFAULT_ENV_VARIABLES_ARRAY, A_Container, A_Context } from "@adaas/a-concept"
import { SignInComponent } from "./components/SignInComponent.component"
import { ABtn } from "./components/A-Btn.component";
import { AInput } from "./components/A-Input.component";
import { AreRouteSignal } from "src/signals/AreRoute.signal";
import { ANavigation } from "./components/A-Navigation.component";
import { A_Config, ConfigReader } from "@adaas/a-utils/a-config";
import { A_Logger, A_LOGGER_ENV_KEYS } from "@adaas/a-utils/a-logger";
import { A_SignalBus } from "@adaas/a-utils/a-signal";
import { A_Polyfill } from "@adaas/a-utils/a-polyfill";
import { AreApp, AreContext, AreHTMLEngine, AreInitSignal, AreRoot, AreSyntax } from "src";
import { AreSlot } from "src/lib/AreSlot/AreSlot.component";
import { PromptTextArea } from "./components/PromptTextArea.component";


// //  TODO: Fix for build system ---
// window.process = { env: { NODE_ENV: 'production' }, cwd: () => "/" } as any; // --- IGNORE ---
// window.__dirname = "/"; // --- IGNORE ---

(async () => {
    try {

        const container = new AreApp({
            name: 'ARE Jumpstart',
            components: [
                // ----------------------------------
                // Allowed Entities 
                // ----------------------------------
                // ............
                // ----------------------------------
                // Allowed Commands 
                // ----------------------------------
                // ............
                // ----------------------------------
                // UI Components 
                // ----------------------------------
                SignInComponent,
                ABtn,
                AInput,
                AreSlot,
                A_SignalBus,
                // ----------------------------------
                // Addons 
                // ----------------------------------
                AreRoot,
                ConfigReader,
                AreHTMLEngine,
                PromptTextArea,
                A_Logger,
                AreSyntax,
                ANavigation
            ],
            entities: [
                // ............
                AreInitSignal,
                AreRouteSignal
            ],
            fragments: [
                new AreContext(document.body.innerHTML),
              
                new A_Config({
                    defaults: {
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'info',
                    }
                }),
            ]
        });

        const concept = new A_Concept({
            name: 'adaas-are-example-jumpstart',
            fragments: [new A_Config({
                variables: ['CONFIG_VERBOSE', 'DEV_MODE'] as const,
                defaults: {
                    CONFIG_VERBOSE: true,
                    DEV_MODE: true
                }
            })],
            components: [A_Logger, ConfigReader, A_Polyfill],
            containers: [container]
        })


        await concept.load();
        await concept.start();


    } catch (error) {
        const logger = A_Context.root.resolve<A_Logger>(A_Logger)!;
        logger.error(error);
    }



})();