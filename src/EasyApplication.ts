import { Manager, ManagerClass } from './Manager'
import { Initiable } from './Initiable'
import { Middleware, MiddlewareClass } from './Middleware'

/**
 * The main application.
 * @template M Middleware type.
 */
export class EasyApplication<M extends Middleware<any> = Middleware<any>> implements Initiable {
    /**
     * Mapping from manager classes to manager instances.
     * @private
     */
    private readonly byManagerClass = new Map<ManagerClass, Manager>()

    /**
     * Mapping from middleware classes to middleware instances.
     * @private
     */
    private readonly byMiddlewareClass = new Map<MiddlewareClass<any, M>, M>()

    /**
     * Creates an application.
     * @param managerClassList A list of manager classes that this application contains.
     */
    public constructor(managerClassList: ManagerClass[]) {
        for (const ManagerClass of managerClassList) {
            const manger = new ManagerClass(this)
            manger.init()

            this.byManagerClass.set(ManagerClass, manger)
        }

        this.init()
    }

    /**
     * Initializes this application.
     */
    public init(): void {}

    /**
     * Gets a manager.
     * @param ManagerClass The manager class to get.
     * @template T The manager class.
     */
    public getManager<T extends Manager>(ManagerClass: ManagerClass<T>): T {
        const manager = this.byManagerClass.get(ManagerClass)
        if (manager === undefined) {
            throw new ManagerNotFoundException(ManagerClass)
        }

        return manager as T
    }

    /**
     * Registers a middleware to this application.
     * @param MiddlewareClass The middleware class to register.
     */
    public registerMiddleware(MiddlewareClass: MiddlewareClass<any, M>): M {
        const middleware: M = new MiddlewareClass(this)
        middleware.init()

        this.byMiddlewareClass.set(MiddlewareClass, middleware)

        return middleware
    }
}

/**
 * This exception is thrown when a manager is not found in an application.
 */
export class ManagerNotFoundException extends Error {
    /**
     * Creates a manager not found exception.
     * @param ManagerClass The manager class not found.
     */
    public constructor(private readonly ManagerClass: ManagerClass) {
        super(`Manager class not found: ${ManagerClass.name}`)
    }

    /**
     * Returns the manager class not found.
     */
    public getManagerClass(): ManagerClass {
        return this.ManagerClass
    }
}
