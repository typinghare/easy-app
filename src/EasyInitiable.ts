/**
 * Interface representing an object that can be initialized.
 * Initiable is not a typo. See https://en.wiktionary.org/wiki/initiable.
 */
export interface EasyInitiable {
    /**
     * Initializes the object.
     */
    init: () => void
}
