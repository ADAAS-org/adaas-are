import { A_Fragment, ASEID } from "@adaas/a-concept";
import { AreCacheWatchingEntity } from "./AreCache.types";

export class AreCache extends A_Fragment {

    constructor(
        aseid: ASEID | string
    ) {
        super({
            name: aseid.toString(),
        });
    }


    add(
        /**
         * a path to object, for example it could be :'user.profile.name' for {{ user.profile.name }} interpolation.
         * This path will be used to find all related attributes and interpolations when 
         * the value of this path changes, so we can update them accordingly.
         */
        path: string, value: AreCacheWatchingEntity) {

        const impactedPaths = String(path).split('.').reduce((acc, part, index, arr) => {
            const currentPath = arr.slice(0, index + 1).join('.');
            acc.push(currentPath);
            return acc;
        }, [] as string[]);

        impactedPaths.forEach(p => {
            this.watchList.set(p, value);
        });
    }


    get(key: string) {
        return this.watchList.get(key);
    }


    clear() {
        this.watchList.clear();
    }
}