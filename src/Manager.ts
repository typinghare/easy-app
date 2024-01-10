import { Application } from './Application'
import { Initiable } from './Initiable'
import { ApplicationBased } from './ApplicationBased'

/**
 * Manager of an application.
 */
export abstract class Manager extends ApplicationBased implements Initiable {
    /**
     * Uses a manager that is in the application creating this manager.
     * @param ManagerClass The class of the manager to use.
     * @template T The manager class type.
     */
    public use<T extends Manager>(ManagerClass: ManagerClass<T>): T {
        return this.application.getManager(ManagerClass)
    }

    /**
     * Initializes this manager.
     */
    public init(): void {}
}

/**
 * Manager class type.
 * <T>
 */
export type ManagerClass<T extends Manager = Manager> = new (application: Application) => T
