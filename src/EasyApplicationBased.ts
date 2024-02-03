import { EasyApplication } from './EasyApplication'
import { EasyManager, EasyManagerClass } from './EasyManager'

/**
 * Application based.
 */
export class EasyApplicationBased<A extends EasyApplication = EasyApplication> {
    /**
     * Creates an application based object.
     * @param application The application creating this object.
     */
    public constructor(protected readonly application: A) {}

    /**
     * Returns the application creating this object
     */
    public getApplication(): A {
        return this.application
    }

    /**
     * Uses a manager that is in the application creating this manager.
     * @param EasyManagerClass The class of the manager to use.
     * @template T The manager class type.
     */
    public use<T extends EasyManager>(EasyManagerClass: EasyManagerClass<T>): T {
        return this.application.use(EasyManagerClass)
    }
}
