import { Application, Manager, ManagerNotFoundException } from '../src'

describe('Basic tests', () => {
    class UserManager extends Manager {}

    class OrderManager extends Manager {}

    class TransactionManager extends Manager {}

    class MyApplication extends Application {
        public constructor() {
            super([UserManager, OrderManager])
        }
    }

    it('Test application', () => {
        const application = new MyApplication()
        expect(application.getManager(UserManager)).toBeInstanceOf(UserManager)
        expect(application.getManager(OrderManager)).toBeInstanceOf(OrderManager)
        expect(() => {
            application.getManager(TransactionManager)
        }).toThrow(ManagerNotFoundException)

        try {
            application.getManager(TransactionManager)
        } catch (e) {
            expect((e as ManagerNotFoundException).getManagerClass()).toBe(TransactionManager)
        }
    })

    it('Test ApplicationBased', () => {
        const application = new MyApplication()
        const userManager = application.getManager(UserManager)

        expect(userManager.getApplication()).toBe(application)
    })

    it('Test manager use()', () => {
        const application = new MyApplication()
        const userManager = application.getManager(UserManager)

        expect(userManager.use(OrderManager)).toBeInstanceOf(OrderManager)
        expect(() => {
            userManager.use(TransactionManager)
        }).toThrow(ManagerNotFoundException)
    })
})
