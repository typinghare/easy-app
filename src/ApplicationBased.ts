import { Application } from './Application'

/**
 * Application based.
 */
export class ApplicationBased {
    /**
     * Creates an application based object.
     * @param application The application creating this object.
     */
    public constructor(protected readonly application: Application) {}

    /**
     * Returns the application creating this object
     */
    public getApplication(): Application {
        return this.application
    }
}
