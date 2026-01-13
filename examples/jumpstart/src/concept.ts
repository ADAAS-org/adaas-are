import { A_Concept, A_CONSTANTS__DEFAULT_ENV_VARIABLES_ARRAY, A_Container, A_Context } from "@adaas/a-concept"
import { A_Config, A_Logger, A_LOGGER_DEFAULT_LEVEL, A_LOGGER_ENV_KEYS, A_Polyfill, A_SignalBus, ConfigReader, } from "@adaas/a-utils"
import { SignInComponent } from "./components/SignInComponent.component"
import { ABtn } from "./components/A-Btn.component";
import { AInput } from "./components/A-Input.component";
import { AreApp } from "@adaas/are/containers/AreApp/AreApp.container";
import { AreBrowserCompiler } from "@adaas/are/components/AreBrowserCompiler/AreBrowserCompiler.component";
import { AreSlot } from "@adaas/are/components/AreSlot/AreSlot.component";
import { AreInitSignal } from "src/signals/AreInit.signal";
import { AreSyntax } from "@adaas/are/context/AreSyntax/AreSyntax.context";
import { AreRoot } from "@adaas/are/components/AreRoot/AreRoot.component";
import { AreInterpolation } from "@adaas/are/components/AreInterpolation/AreInterpolation.component";


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
                AreRoot,
                AreInterpolation,
                // ----------------------------------
                // Addons 
                // ----------------------------------
                A_Polyfill,
                ConfigReader,
                // A_ServerProxy
                AreBrowserCompiler,
                A_Logger
            ],
            entities: [
                // ............
                AreInitSignal,
            ],

            fragments: [
                new A_Config({
                    defaults: {
                        A_UI_MOUNT_POINT: 'a-root',
                        [A_LOGGER_ENV_KEYS.LOG_LEVEL]: 'debug',
                    }
                }),
                new AreSyntax()
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