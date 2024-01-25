import { EasyApplicationBased } from './EasyApplicationBased'
import { EasyApplication } from './EasyApplication'
import { EasyInitiable } from './EasyInitiable'

/**
 * Abstract middleware based on an application.
 */
export abstract class EasyMiddleware<A extends EasyApplication>
    extends EasyApplicationBased<A>
    implements EasyInitiable {
    /**
     * Initializes this middleware.
     */
    public init(): void {}
}

/**
 * Middleware class type.
 * @template A The application class.
 * @template T Concrete middleware class.
 */
export type MiddlewareClass<
    A extends EasyApplication = EasyApplication,
    T extends EasyMiddleware<A> = EasyMiddleware<A>,
> = new (application: A) => T
