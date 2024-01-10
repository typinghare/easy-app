import { Manager, ManagerClass } from './Manager'

/**
 * The main application.
 */
export class Application {
    /**
     * Mapping from manager classes to manager instances.
     * @private
     */
    private readonly byManagerClass = new Map<ManagerClass, Manager>()

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
    }

    /**
     * Gets a manager.
     * @param ManagerClass The class of the manager to get.
     * @template T The manager class type.
     */
    public getManager<T extends Manager>(ManagerClass: ManagerClass<T>): T {
        const manager = this.byManagerClass.get(ManagerClass)
        if (manager === undefined) {
            throw new ManagerNotFoundException(ManagerClass)
        }

        return manager as T
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
