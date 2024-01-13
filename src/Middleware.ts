import { EasyApplicationBased } from './EasyApplicationBased'
import { EasyApplication } from './EasyApplication'
import { Initiable } from './Initiable'

/**
 * Abstract middleware based on an application.
 */
export abstract class Middleware<A extends EasyApplication>
    extends EasyApplicationBased<A>
    implements Initiable {
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
    T extends Middleware<A> = Middleware<A>,
> = new (application: A) => T
