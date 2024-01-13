import { EasyApplication } from './EasyApplication'

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
}
