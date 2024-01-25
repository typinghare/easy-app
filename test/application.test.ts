import { EasyApplication, EasyManager, ManagerNotFoundException } from '../src'

describe('Basic tests', () => {
    class UserManager extends EasyManager<MyApplication> {}

    class OrderManager extends EasyManager<MyApplication> {}

    class TransactionManager extends EasyManager<MyApplication> {}

    class MyApplication extends EasyApplication {
        public constructor() {
            super([UserManager, OrderManager])
        }

        public foo(): number {
            return 0
        }
    }

    it('Test application', () => {
        const application = new MyApplication()
        expect(application.use(UserManager)).toBeInstanceOf(UserManager)
        expect(application.use(OrderManager)).toBeInstanceOf(OrderManager)
        expect(() => {
            application.use(TransactionManager)
        }).toThrow(ManagerNotFoundException)

        try {
            application.use(TransactionManager)
        } catch (e) {
            expect((e as ManagerNotFoundException).getManagerClass()).toBe(TransactionManager)
        }
    })

    it('Test ApplicationBased', () => {
        const application = new MyApplication()
        const userManager = application.use(UserManager)

        expect(userManager.getApplication()).toBe(application)
        expect(application.foo()).toBe(0)
    })

    it('Test manager use()', () => {
        const application = new MyApplication()
        const userManager = application.use(UserManager)

        expect(userManager.use(OrderManager)).toBeInstanceOf(OrderManager)
        expect(() => {
            userManager.use(TransactionManager)
        }).toThrow(ManagerNotFoundException)
    })
})
