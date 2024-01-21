import { EasyApplication } from './EasyApplication'
import { Initiable } from './Initiable'
import { EasyApplicationBased } from './EasyApplicationBased'

/**
 * Manager of an application.
 */
export abstract class Manager<A extends EasyApplication = EasyApplication>
    extends EasyApplicationBased<A>
    implements Initiable
{
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
 * @template T Concrete manager class.
 */
export type ManagerClass<T extends Manager = Manager, A extends EasyApplication = any> = new (
    application: A
) => T
