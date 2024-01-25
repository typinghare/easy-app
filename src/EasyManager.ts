import { EasyApplication } from './EasyApplication'
import { EasyInitiable } from './EasyInitiable'
import { EasyApplicationBased } from './EasyApplicationBased'

/**
 * Manager of an application.
 */
export abstract class EasyManager<A extends EasyApplication = EasyApplication>
    extends EasyApplicationBased<A>
    implements EasyInitiable
{
    /**
     * Uses a manager that is in the application creating this manager.
     * @param ManagerClass The class of the manager to use.
     * @template T The manager class type.
     */
    public use<T extends EasyManager>(ManagerClass: ManagerClass<T>): T {
        return this.application.use(ManagerClass)
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
export type ManagerClass<T extends EasyManager = EasyManager, A extends EasyApplication = any> = new (
    application: A
) => T
