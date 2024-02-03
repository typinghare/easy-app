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
     * Initializes this manager.
     */
    public init(): void {}
}

/**
 * Manager class type.
 * @template T Concrete manager class.
 */
export type EasyManagerClass<T extends EasyManager = EasyManager, A extends EasyApplication = any> = new (
    application: A
) => T
